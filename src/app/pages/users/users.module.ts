import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SidebarModule } from '../internal-shared/sidebar/sidebar.module';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SidebarModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports:[RouterModule]
})
export class UsersModule { }
