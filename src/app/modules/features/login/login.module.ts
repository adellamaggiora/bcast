import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
