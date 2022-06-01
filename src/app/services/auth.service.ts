import { Injectable } from '@angular/core';
import { Registration } from '../models/registration';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  pathApi: string;

  constructor(private http: HttpClient) { 
    this.pathApi = environment.pathApi;
  }

  registration(data: Registration) {
    return this.http.post<Registration>(this.pathApi + '/api/auth/signup', data)
  }

  login(data: Login){
    return this.http.post<Login>(this.pathApi + '/api/auth/login', data)
  }

  logged(){
    return localStorage.getItem('user') != null;
  }
}
