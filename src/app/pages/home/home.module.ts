import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';
import { SidebarModule } from './../internal-shared/sidebar/sidebar.module'


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
 
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    SidebarModule
  ],
  exports:[RouterModule]
})
export class HomeModule { }
