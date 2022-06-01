import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from './../../../services/customers.service';
import { Comune } from 'src/app/models/comune';
import { Provincia } from 'src/app/models/provincia';
import { Customers } from 'src/app/models/customers';
import { Router } from '@angular/router';



@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  save!: boolean;
  comuneId!: number;
  province: string[] = [];
  tipi: string[] = [];
  comuniNomi: string[] = [];


  selectedComuni!: string;
  selectedProvince!: string;
  res!: any;
  res2!: any;
  res3!: any;


  NewCustomersList = true;

  constructor(private _formBuilder: FormBuilder, private cstSrv: CustomersService, private router: Router) {
    this.firstFormGroup = this._formBuilder.group({
      RagioneSociale: ['', Validators.required],
      partitaIva: ['', Validators.required],
      email: ['', Validators.required],
      pec: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoCliente: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      nomeContatto: ['', Validators.required],
      cognomeContatto: ['', Validators.required],
      emailContatto: ['', Validators.required],
      telefonoContatto: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      via: ['', Validators.required],
      civico: ['', Validators.required],
      cap: ['', Validators.required],
      localita: ['', Validators.required],
      comune: ['', Validators.required],
      provincia: ['', Validators.required],
    });

    this.save = false;
  }

  ngOnInit(): void {
    this.getProvince();
    this.getTipi()
  }

  newCustomer() {
    this.save = true;
    setInterval(() => {
      this.save = false;
    }, 1500);

    let data: Customers = {
      ragioneSociale: '',
      partitaIva: '',
      tipoCliente: '',
      email: '',
      pec: '',
      telefono: '',
      nomeContatto: '',
      cognomeContatto: '',
      telefonoContatto: '',
      emailContatto: '',
      indirizzoSedeOperativa: {
        via: '',
        civico: 0,
        cap: 0,
        localita: '',
        comune: {
          id: 0,
          nome: '',
          provincia: {
            id: 0,
            nome: '',
            sigla: '',
          }
        }
      }
    };

    // first form immision
    data.ragioneSociale = this.firstFormGroup.value.RagioneSociale;
    data.partitaIva = this.firstFormGroup.value.partitaIva;
    data.tipoCliente = this.firstFormGroup.value.tipoCliente;
    data.email = this.firstFormGroup.value.email;
    data.pec = this.firstFormGroup.value.pec;
    data.telefono = this.firstFormGroup.value.telefono;

    // second form immision
    data.nomeContatto = this.secondFormGroup.value.nomeContatto;
    data.cognomeContatto = this.secondFormGroup.value.cognomeContatto;
    data.telefonoContatto = this.secondFormGroup.value.telefonoContatto;
    data.emailContatto = this.secondFormGroup.value.emailContatto;

    // third form immision
    data.indirizzoSedeOperativa.via = this.thirdFormGroup.value.via;
    data.indirizzoSedeOperativa.civico = this.thirdFormGroup.value.civico;
    data.indirizzoSedeOperativa.cap = this.thirdFormGroup.value.cap;
    data.indirizzoSedeOperativa.localita = this.thirdFormGroup.value.localita;
    data.indirizzoSedeOperativa.comune.id = this.comuneId ,

    this.cstSrv.newCustomer(data).subscribe();

    setTimeout(() => {
      this.router.navigate(['/customers'])
    }, 1000);

  }

  getComuni() {
    this.comuniNomi = ['']
    this.cstSrv.getComuni().subscribe((res) => {
      this.res = res;
      this.res.content.forEach((comune: Comune) => {
        if (this.selectedProvince == comune.provincia.nome) {
          this.comuniNomi.push(comune.nome)
        }
      });
    })
  }

  getIdComune(comuneNome: string) {
    for (let index = 0; index < this.res.content.length; index++) {
      if ( this.res.content[index].nome == comuneNome ) {
          this.comuneId = this.res.content[index].id;
      }
    }
  }

  getProvince() {
    this.cstSrv.getProvince().subscribe((res) => {
      this.res2 = res;
      this.res2.content.forEach((provincia: Provincia) => {
        this.province.push(provincia.nome);
      });
    })
  }

  getTipi() {
    this.cstSrv.getTipi().subscribe((res) => {
      this.res3 = res;
      this.res3.forEach((tipo: string) => {
        this.tipi.push(tipo);
      });
    })
  }



}
