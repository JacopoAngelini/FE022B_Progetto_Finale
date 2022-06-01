import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 

  constructor(private autSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    document.body.className = "background-login";
  }

  ngOnDestroy(){
    document.body.className="";
  }

  login(form: NgForm){
    let login = {
      username: form.value.username,
      password: form.value.password
    };
    this.autSrv.login(login).subscribe((res) => {
      console.log(res);
      localStorage.setItem('user',  JSON.stringify(res))
      this.router.navigate(['/home']);
    },
    error => {
      alert('i dati non corrispondono a nessun utente registrato')
      form.reset()
    });
  }

}
