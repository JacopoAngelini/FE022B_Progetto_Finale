import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSharedComponent } from './auth-shared.component'
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AuthSharedComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[AuthSharedComponent]
})
export class AuthSharedModule { }
