import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  pathApi: string;

  constructor(private http: HttpClient) { 
    this.pathApi = environment.pathApi;
  }

  getAllUsers(page:number){
    return this.http.get(this.pathApi + `/api/users?page=${page}`)
  }


}
