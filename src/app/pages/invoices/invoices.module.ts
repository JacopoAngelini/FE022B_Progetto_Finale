import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent, InvoicesComponentDialog } from './invoices.component';
import { SidebarModule } from '../internal-shared/sidebar/sidebar.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewInvoicesComponent } from './new-invoices/new-invoices.component';




const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
  },
  {
    path: ':0',
    component: NewInvoicesComponent,
  }
 
];


@NgModule({
  declarations: [InvoicesComponent, InvoicesComponentDialog, NewInvoicesComponent],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[RouterModule]
})
export class InvoicesModule { }
