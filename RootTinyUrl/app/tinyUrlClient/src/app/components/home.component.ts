/**
 * Created by DalinXie on 17/5/27.
 */
import { Component } from '@angular/core';
import { UrlService } from '../services/url.service';
import { Router } from '@angular/router';
export class UrlSet {
    longUrl: string;
    shortUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  //title = 'app works!';
  longUrl: string;
  shortUrl: string;

  constructor(private urlService: UrlService, private  router: Router) {}
  onSubmit() {
    //console.log("dfdfdf" + this.longUrl);
    this.urlService.getShortUrl(this.longUrl)
      .subscribe(
         result => {
           this.shortUrl = result.shortUrl;
           //console.log('hahah short is ' + this.shortUrl);
           this.router.navigateByUrl('client/urls/' + this.shortUrl);
         },
        error => {
           console.log(error);
        }
      )
  }
}
