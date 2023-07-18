import { Component, OnInit } from '@angular/core';
import { UserService } from "src/services/user.service";
import { ProfileFormValidator } from './profile-form-validator';
import client from 'src/api/client';
import { Session } from '@supabase/supabase-js';
import { IUserInfo } from 'src/interfaces/user-info';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  formValidator: ProfileFormValidator;
  userSession: Session;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.initializeFormValidator();
    this.readUserSession();
  }

  async readUserSession() {
    this.userSession = await this.userService.userSession.get();
  }

  async save() {
    const tag = this.formValidator.tag.value;
    const userId = await this.userService.userSession.getId();
    await client.userInfo.update(userId, { tag });
    await this.userService.userInfo.fetch(userId);
    this.initializeFormValidator();
  }

  initializeFormValidator() {
    this.userService.userInfo.get$().subscribe((userInfo: IUserInfo) => {
      this.formValidator = new ProfileFormValidator(userInfo);
    })
  }

}
