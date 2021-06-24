import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aphta-front';

  isLoggedIn: true; 
  constructor(private router : Router){}
  chw(){
    this.router.navigateByUrl('/chw');
  }
  home(){
    this.router.navigateByUrl('/home');
  }

}

