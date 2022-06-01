import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Invoices } from 'src/app/models/invoices';

export interface DialogData {
  importo: number;
  statoId: number;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoicesList = true;
  res!: any;
  invoices!: any;
  data: DialogData = {
    importo: 0,
    statoId: 0
  }

  displayedColumns: string[] = ['Numero Fattura', 'Intestatario', 'Importo', 'Anno', 'Stato', 'Azioni'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ivcSrv: InvoicesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllInvoices(0);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getAllInvoices(this.paginator.pageIndex))
    )
      .subscribe()
  }

  getAllInvoices(page: number) {
    this.ivcSrv.getAllInvoices(page).subscribe((res) => {
      this.res = res;
      this.invoices = this.res.content
      console.log(this.res);
      console.log(this.invoices);
    },
      error => {
        console.log(error)
      })
  }

  deleteInvoice(id: number) {
    let confirmDelete = confirm("sicuro di voler cancellare questa fattura?");
    if (confirmDelete) {
      this.ivcSrv.deleteInvoice(id).subscribe();
      setInterval(() => {
        location.reload();
      }, 500)
    }
  }

  editInvoice(invoice: Invoices) {
    const dialogRef = this.dialog.open(InvoicesComponentDialog, {
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
  selector: 'invoices-component-dialog',
  templateUrl: 'invoices-component-dialog.html',
})
export class InvoicesComponentDialog {

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
    public dialogRef: MatDialogRef<InvoicesComponentDialog>,
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


