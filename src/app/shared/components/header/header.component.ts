import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Shop";
  cartId = Number(this.cookieService.get("cartId"));
  constructor(private cookieService : CookieService) { }

  ngOnInit(): void {
  }

}
