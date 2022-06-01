import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent, CustomerComponentDialog } from './customers.component';
import { SidebarModule } from '../internal-shared/sidebar/sidebar.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  },
  {
    path: ':id',
    component: NewCustomerComponent,
  },
 
];


@NgModule({
  declarations: [CustomersComponent,  NewCustomerComponent, CustomerComponentDialog],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule]
})
export class CustomersModule { }
