import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard'

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path:'signup',
    loadChildren: () => import('./pages/signup/signup.module').then((m) => m.SignupModule)
  },
  {
    path:'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path:'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule)
  },
  {
    path:'customers',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/customers/customers.module').then((m) => m.CustomersModule)
  },
  {
    path:'invoices',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/invoices/invoices.module').then((m) => m.InvoicesModule)
  },
  {
    path:'invoicesbycustomer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/customers/invoices-by-customer/invoices-by-customer.module').then((m) => m.InvoicesByCustomerModule)
  },
];



@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
