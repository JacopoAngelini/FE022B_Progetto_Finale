import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service'

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  roles: Roles[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' },
  ];
  



  constructor(private autSrv: AuthService, private router: Router) { }


  ngOnInit(): void {
    document.body.className = "background-signup";
  }

  ngOnDestroy() {
    document.body.className = "";
  }

  registration(form: NgForm) {
    let dataRegistration = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      role: [form.value.role]
    }
    console.log(dataRegistration),
    this.autSrv.registration(dataRegistration).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/']);
    },
    error => {
      alert(error.error.message);
      form.reset()
    });
   }

}
