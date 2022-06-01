import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Invoices } from 'src/app/models/invoices';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-new-invoices',
  templateUrl: './new-invoices.component.html',
  styleUrls: ['./new-invoices.component.scss']
})
export class NewInvoicesComponent implements OnInit {

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

  isLinear = false;
  firstFormGroup!: FormGroup;
  save!: boolean;
  Newinvoices = true;
  sub!: Subscription;
  idUser!: number;

  constructor(private _formBuilder: FormBuilder, private router: Router, private actRouter: ActivatedRoute , private ivsSrv: InvoicesService) {
    this.firstFormGroup = this._formBuilder.group({
      importo: ['', Validators.required],
      anno: ['', Validators.required],
      stato: ['', Validators.required],
      numero: ['', Validators.required],
    });

    this.save = false;
  }

  ngOnInit(): void {
    this.sub = this.actRouter.params.subscribe((params) => {
      this.idUser = +params[0];
      console.log(this.idUser);
    })
  }

  newInvoice(){

    this.save = true;

    let invoices: Invoices = {
      data: '',
      numero: 0,
      anno: 0,
      importo: 0,
      stato: {
        id: 0,
        nome: ''
      },
      cliente: {
        id: 0
      }
    };

    invoices.anno =  this.firstFormGroup.value.anno;
    invoices.importo = this.firstFormGroup.value.importo;
    invoices.stato.id = this.firstFormGroup.value.stato;
    invoices.cliente.id = this.idUser;
    invoices.numero =  this.firstFormGroup.value.numero;
    invoices.data = (new Date()).toISOString()
    console.log(invoices);

    this.ivsSrv.addInvoice(invoices).subscribe();
    
    setTimeout(() => {
      this.save = false
    }, 2000);

    setTimeout(() => {
      this.router.navigate(['/invoicesbycustomer',this.idUser])
    }, 1000);

  }

}
