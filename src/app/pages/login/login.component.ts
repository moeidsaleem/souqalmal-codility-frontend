  
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  emailFormControl = new FormControl('moeidsaleem@gmail.com', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('moeid123', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(private api:ApiService,private helper:HelperService, private router:Router) { }

  ngOnInit() {
  }

  login() {
    if (!this.emailFormControl.valid) {
      alert('Please enter correct email')
      this.emailFormControl.reset()
      return
    }
    if (!this.passwordFormControl.valid) {
      alert('Please enter correct password format')
      this.passwordFormControl.reset()
      return
    }


  // login user  
    this.api.login(this.emailFormControl.value , this.passwordFormControl.value).
    subscribe(response=>{
      localStorage.setItem('token', response.token);
    })

    then(data=>{
      console.log('data', data);
      // user login 
       this.router.navigate(['/dashboard']).then(()=>{
         this.api.setCurrentUser(data.user.uid)
        //  console.log(this.api.currentUser)
       })
    },err=> this.helper.openSnackBar(err.message, 'Close'))
  }

}