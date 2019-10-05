import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Shop } from 'src/app/intefaces/shop';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.API_URL
  token
  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    this.token = token ? token : undefined
  }


  ///Authentictor 


  login(email, password) {
   return this.http.post(this.API_URL + '/auth/signin', {email, password}).pipe(retry(3), catchError(this.handleError))
  }


  register(name, email, password){
    // this.http.post(this.API_URL + '/auth/signin')
  }
  




  getShops() {
    this.http.get(this.API_URL + '/shops/all', this.getHeaders()).pipe(
      catchError(this.handleError)

    ).subscribe(response => {
      console.log('response--', response);
    })
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return httpOptions
  }






}
