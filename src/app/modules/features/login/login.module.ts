import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '../../shared/ui-kit/ui-kit.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UiKitModule
  ]
})
export class LoginModule { }
