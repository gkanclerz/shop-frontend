import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { FullpageModule } from './layouts/fullpage/fullpage.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FullpageadminModule } from './layouts/fullpageadmin/fullpageadmin.module';
import { FullpageadminemptyModule } from './layouts/fullpageadminempty/fullpageadminempty.module';
import { JwtInterceptor } from './modules/common/interceptor/jwt.interceptor';
import { AdminAuthorizeGuard } from './modules/admin/common/guard/adminAuthorizeGuard';
import { ProfileAuthorizeGuard } from './modules/common/guard/profileAuthorizeGuard';
import { PasswordResetAuthorizeGuard } from './modules/password-reset/guard/passwordResetAuthorizeGuard';
import { PasswordResetComponent } from './modules/password-reset/password-reset.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullpageModule,
    FullpageadminModule,
    FullpageadminemptyModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AdminAuthorizeGuard,
    ProfileAuthorizeGuard,
    PasswordResetAuthorizeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
