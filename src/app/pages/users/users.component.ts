import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Users } from './../../models/users';
import { UsersService } from 'src/app/services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  userList = true;

  displayedColumns: string[] = ['Id', 'Username', 'Email', 'Ruolo'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  users: Users[] = [];
  res!: any;

  constructor(private ursSrv: UsersService) { }


  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.getAllUsers(this.paginator.pageIndex))
    )
    .subscribe()
  }

  

  ngOnInit(): void {
    this.getAllUsers(0);
  }

  getAllUsers(page: number){
    this.ursSrv.getAllUsers(page).subscribe((res) => {
      this.res = res;
      console.log(this.res.totalElements)
      this.users = this.res.content;
      this.users.forEach((element:any, i) => {
       if(element.roles.length == 0){
         element.roles = [{id: 0, roleName: ''}]
       }
      });
    },
    error => {
      console.log(error)
    })

  }



}
