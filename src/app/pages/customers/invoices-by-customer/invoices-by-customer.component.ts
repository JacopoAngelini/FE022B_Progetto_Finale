import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Invoices } from 'src/app/models/invoices';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  importo: number;
  statoId: number;
}


@Component({
  selector: 'app-invoices-by-customer',
  templateUrl: './invoices-by-customer.component.html',
  styleUrls: ['./invoices-by-customer.component.scss']
})
export class InvoicesByCustomerComponent implements OnInit {

  InvoicesCustomerList = true;
  res!: any;
  invoices: Invoices[] = [];
  id!: number;
  data: DialogData = {
    importo: 0,
    statoId: 0
  }

  displayedColumns: string[] = ['Numero Fattura', 'Intestatario', 'Importo', 'Anno', 'Stato', 'Azioni'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  sub!: Subscription;

  constructor(private ivcSrv: InvoicesService, private router: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
    });
    this.getInvoicesByCustomer(0, this.id);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getInvoicesByCustomer(this.paginator.pageIndex, this.id))
    )
    .subscribe()
  }

  getInvoicesByCustomer(page: number, id?: number){
    this.ivcSrv.getInvoicesByCustomer(page, id).subscribe((res) => {
      this.res = res;
      this.invoices = this.res.content
      this.paginator.pageIndex = this.res.number;
      console.log(this.res);
      console.log(this.invoices);
    },
    error => {
      console.log(error)
    })
  }

  deleteInvoiceByCustomer(id: number){
   let confirmDelete= confirm("sicuro di voler cancellare questa fattura?");
   if(confirmDelete){
    this.ivcSrv.deleteInvoice(id).subscribe();
    setInterval(() =>{
      location.reload();
    },500)
   }
  }

  editInvoice(invoice: Invoices) {
    const dialogRef = this.dialog.open(InvoicesByCustomerComponentDialog, {
      width: '250px',
      data: { importo: null, statoId: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result.importo != null && result.statoId != null) {
        invoice.importo = result.importo;
        if ( result.statoId == 1){
          invoice.stato.nome = 'PAGATA'
        }
        else{
          invoice.stato.nome = 'NON PAGATA'
        }
        invoice.stato.id = result.statoId
        console.log(invoice);
        this.ivcSrv.editInvoice(invoice.id, invoice).subscribe();
      }
    });
  }

}

@Component({
  selector: 'invoicesbycustomer-component-dialog',
  templateUrl: 'invoicesbycustomer-component-dialog.html',
})
export class InvoicesByCustomerComponentDialog {

  stati = [
    {
      "id": 1,
      "nome": "PAGATA"
    },
    {
      "id": 2,
      "nome": "NON PAGATA",
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<InvoicesByCustomerComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getChanges(importo: number, statoId: number) {
    let data: DialogData = {
      importo: importo,
      statoId: statoId
    }
    return data
  }
}






