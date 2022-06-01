import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Invoices } from '../models/invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  pathApi: string;

  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi;
  }

  getAllInvoices(page: number) {
    return this.http.get(this.pathApi + `/api/fatture?page=${page}&size=20&sort=id,ASC`)
  }

  getInvoicesByCustomer(page: number, id?: number) {
    return this.http.get(this.pathApi + `/api/fatture/cliente/${id}?page=${page}&size=20&sort=id,ASC`)
  }

  deleteInvoice(id: number) {
    return this.http.delete(this.pathApi + `/api/fatture/${id}`);
  }

  addInvoice(data: Invoices){
    return this.http.post(this.pathApi + `/api/fatture`, data)
  }

  editInvoice(id: number | undefined, data: Invoices){
    return this.http.put(this.pathApi + `/api/fatture/${id}`, data)
  }



}
