import { CookieService } from 'ngx-cookie';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cookieService: CookieService) {}

  checkLogin() {
    const id = this.cookieService.get('id');
    if (!id) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.cookieService.remove('id');
  }
}
