import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Customers } from './../../models/customers';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  ragioneSociale: string;
  email: string;
  partitaIva: string;
}


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customersList = true;

  displayedColumns: string[] = ['Id', 'Ragione Sociale', 'Email', 'Partita IVA', 'Azioni'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  customers: Customers[] = [];
  res!: any;


  constructor(private ctmSrv: CustomersService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCustomers(0);
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getAllCustomers(this.paginator.pageIndex))
    )
    .subscribe()
  }

  getAllCustomers(page: number){
      this.ctmSrv.getAllCustomers(page).subscribe((res) => {
      this.res = res;
      this.customers = this.res.content
      console.log(this.res);
    },
    error => {
      console.log(error)
    })
  }

  deleteCustomer(id: number){
    let confirmDelete= confirm("sicuro di voler cancellare questo cliente e tutte le sue fatture?");
    if(confirmDelete){
      this.ctmSrv.deleteInvoicesCustomer(id).subscribe();
      this.ctmSrv.deleteCustomer(id).subscribe();
      setTimeout(() => {
        location.reload();
      },2500)
    }
  }

  editcustomer(customer: Customers) {
    const dialogRef = this.dialog.open(CustomerComponentDialog, {
      width: '250px',
      data: { ragioneSociale: null, email: null, partitaIva: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(customer)
      if(result.ragioneSociale != null && result.email != null && result.partitaIva != null ) {
         customer.ragioneSociale = result.ragioneSociale;
         customer.email = result.email;
         customer.partitaIva = result.partitaIva;
         this.ctmSrv.editCustomer(customer.id, customer).subscribe();
      }
    });
  }

}

@Component({
  selector: 'customer-component-dialog',
  templateUrl: 'customers-component-dialog.html',
})
export class CustomerComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<CustomerComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getChanges(ragioneSociale: string, email: string, partitaIva: string) {
    let data: DialogData = {
      ragioneSociale: ragioneSociale,
      email: email,
      partitaIva: partitaIva
    }
    return data
  }
}