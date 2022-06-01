import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../../internal-shared/sidebar/sidebar.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoicesByCustomerComponent, InvoicesByCustomerComponentDialog } from './invoices-by-customer.component';

const routes: Routes = [
  {
    path: ':id',
    component: InvoicesByCustomerComponent,
  },
];


@NgModule({
  declarations: [InvoicesByCustomerComponent, InvoicesByCustomerComponentDialog],
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
export class InvoicesByCustomerModule { }
