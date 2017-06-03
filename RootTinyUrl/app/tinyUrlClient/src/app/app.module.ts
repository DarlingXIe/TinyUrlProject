import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import { AboutComponent } from './components/about.component';
import { HomeComponent, AboutComponent, UrlComponent, NotFoundComponent} from './components/index';
import { Routes, RouterModule } from '@angular/router';
//import { HomeComponent } from './components/home.component';
import { UrlService } from './services/url.service';

import { ChartsModule } from 'ng2-charts';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'client/about', component: AboutComponent },
  {path: 'client/home', redirectTo: '/'},
  {path: 'client/urls/:shortUrl', component: UrlComponent},
  {path: 'client/404', component: NotFoundComponent },
  {path: '**', redirectTo: 'client/404'}
];


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    UrlComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  providers: [UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
