import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Customers } from '../models/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  pathApi: string;

  constructor(private http: HttpClient) { 
    this.pathApi = environment.pathApi;
  }

  getAllCustomers(page: number){
    return this.http.get(this.pathApi + `/api/clienti?page=${page}&size=20&sort=id,ASC`)
  }

  getComuni(){
    return this.http.get(this.pathApi + `/api/comuni?page=0&size=20&sort=id,ASC`)
  }

  getProvince(){
    return this.http.get(this.pathApi + `/api/province?page=0&size=20&sort=id,ASC`)
  }
  
  getTipi(){
    return this.http.get(this.pathApi + `/api/clienti/tipicliente`)
  }

  newCustomer(data: Customers){
    return this.http.post(this.pathApi + `/api/clienti`, data)
  } 

  deleteInvoicesCustomer(id: number){
    return this.http.delete(this.pathApi + `/api/fatture/cliente/${id}`)
  }

  deleteCustomer(id: number){
    return this.http.delete(this.pathApi + `/api/clienti/${id}`)
  }

  editCustomer(id: number | undefined, data: Customers){
    return this.http.put(this.pathApi + `/api/clienti/${id}`, data)
  }

}
