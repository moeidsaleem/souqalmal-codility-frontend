import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private api:ApiService, private helper:HelperService, private router:Router) { }
data;
title = 'Shops Dashboard'
currentUser;
response;
  ngOnInit() {
   this.getUser()
    this.getShops();
  }


  getUser(){
    this.api.getUser().subscribe(r=>{
      this.response = r;
      this.currentUser = this.response.user;
      console.log('user', this.currentUser)
    })
  }


  getShops(){
    this.api.getShops().subscribe(response => {
      console.log('response--', response);
      this.data = response;

    })
  }





  open(list) {
    this.helper.openDialog(list)

  }


  logoutModal(c) {
    this.helper.openDialog(c)
  }

  logout() {
  //  this.api.clearData()
    this.router.navigate(['/login']).then(() => this.helper.closeModal())
  }


  closeModal() {
    this.helper.closeModal()
  }



  

}
