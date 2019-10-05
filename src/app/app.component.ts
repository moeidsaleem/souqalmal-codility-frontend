import { Component } from '@angular/core';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'souqalmal-frontend';

  constructor(private api:ApiService){
   let b= this.api.getShops();
  }
  
}
