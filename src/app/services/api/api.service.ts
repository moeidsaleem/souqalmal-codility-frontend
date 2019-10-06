import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Shop } from 'src/app/intefaces/shop';
import { throwError, Subject } from 'rxjs';
import { catchError, retry, takeUntil, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.API_URL
  token;
  user;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    this.token = token ? token : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3YmZiMDQwNmQ5NzQ2OTJlMmVkNGIiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJNb2VpZCBTYWxlZW0gS2hhbiIsImV4cCI6MTU3NTQxODc1OC4xODQsImlhdCI6MTU3MDIzNDc1OH0.WtQiau7mxnYXCyOUNegtg3FtTk5kbJuTiOX8NiHdcPU'
  }


  ///Authentictor 


  login(email, password) {
   return this.http.post(this.API_URL + '/auth/signin', {email, password})
   .pipe(retry(3), catchError(this.handleError));
  }


   signup(name, email, password,loc?){
    // this.http.post(this.API_URL + '/auth/signin')
    // let position = await  this.getPosition(); //pos.lng pos.lat

    return this.http.post(this.API_URL + '/auth/signup',
     {name, email, password, location: {
      type: "Point",
      coordinates: [
         -73.97,
          40.77
      ]
  }
  }).pipe(retry(3), catchError(this.handleError));
  }
  


clearData(){
  localStorage.clear();
  this.user = null;
  this.token = null;
}

  getShops() {
   return this.http.get<any>('http://localhost:3000/api/shops/all', this.getHeaders())
    // .pipe(catchError(this.handleError))
  }


  getUser() {
    return this.http.get<any>('http://localhost:3000/api/users/me', this.getHeaders())
     // .pipe(catchError(this.handleError))
   }
 

  //GET LOCATION 
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };
    return httpOptions
  }

}
