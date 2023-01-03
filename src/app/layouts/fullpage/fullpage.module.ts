import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageComponent } from './fullpage.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordLostComponent } from 'src/app/modules/password-lost/password-lost.component';
import { PasswordResetComponent } from 'src/app/modules/password-reset/password-reset.component';

@NgModule({
  declarations: [
    FullpageComponent,
    LoginComponent,
    PasswordLostComponent,
    PasswordResetComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FullpageModule { }
