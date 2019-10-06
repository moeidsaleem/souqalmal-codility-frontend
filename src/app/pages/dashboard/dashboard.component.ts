import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
    console.log(localStorage.getItem('token'))
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


 async getShops(){
   let lat, long;
   let position = await this.api.getPosition();
   if(position){
     lat = position.lat;
     long = position.long;
   }
    this.api.getShops(lat, long)
    .subscribe(response => {
      console.log('data---', response)
      this.data =response.map(d=>{
        d.liked = false;
           let find;
           if(d.likes){
             find = d.likes.find(value => value == this.currentUser._id)
           }
           if(find){
             d.liked = true;
           }
      
          
        return d
      });
      console.log('data', this.data)
    })
  }


likeShop(shopId){
  console.log('shopId', shopId);
  this.api.likeShop(shopId).subscribe((d)=>{
     this.getShops()
  });

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
