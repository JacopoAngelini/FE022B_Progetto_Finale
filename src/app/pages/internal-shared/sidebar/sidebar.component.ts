import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showFiller = false;

  @Input() userList = false;
  @Input() customersList = false;
  @Input() NewCustomersList = false;
  @Input() invoicesList = false;
  @Input() Newinvoices = false;
  @Input() InvoicesCustomerList = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    let confirmOut = confirm("sicuro di voler uscire ?");
    if (confirmOut){
      localStorage.removeItem('user')
      this.router.navigate(['/'])
    }
  }

  goUsers(){
    this.router.navigate(['/users'])
  }

}
