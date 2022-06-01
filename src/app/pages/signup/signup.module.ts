import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component'
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { AuthSharedModule } from './../auth-shared/auth-shared.module'




const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  }
];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    CommonModule,
    FormsModule,
    AuthSharedModule
  ],
  exports:[RouterModule,CommonModule]
})
export class SignupModule {
 }
