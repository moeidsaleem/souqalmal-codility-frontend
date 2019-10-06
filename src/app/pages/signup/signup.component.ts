import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
// import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
response;
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);


  constructor(private api:ApiService,private helper:HelperService,private router:Router) { }

  ngOnInit() {
  }

  

  async register() {
    if (!this.nameFormControl.valid) {
      alert('Please enter Name')
      this.nameFormControl.reset()
      return
    }
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
    console.log('name', this.nameFormControl.value)
    console.log('email', this.emailFormControl.value)
    console.log('pass', this.passwordFormControl.value)

    let loc = await this.api.getPosition()
    console.log('location', loc);
    this.api.signup(this.nameFormControl.value, this.emailFormControl.value, this.passwordFormControl.value,loc)
    .subscribe(data=>{
      this.response = data;
  
        localStorage.setItem('uid', this.response.token)
        this.router.navigate(['/dashboard']).then(()=>{
          setTimeout(()=>{
            this.helper.openSnackBar('Welcome to Chat App', 'Close');

          }, 300)
        })

    },err=>{
this.helper.openSnackBar(err.message, 'Close');
this.emailFormControl.reset();
this.passwordFormControl.reset();

    })
  }

}