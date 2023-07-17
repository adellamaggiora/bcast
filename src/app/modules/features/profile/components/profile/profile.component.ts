import { Component, OnInit } from '@angular/core';
import { UserService } from "src/services/user.service";
import { ProfileFormValidator } from './profile-form-validator';
import client from 'src/api/client';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(public userService: UserService) { }

  formValidator: ProfileFormValidator;

  ngOnInit() {
    this.initializeFormValidator();
  }

  async save() {
    const tag = this.formValidator.tag.value;
    const userId = await this.userService.userSession.getId();
    await client.userInfo.update(userId, { tag });
    await this.userService.userInfo.fetch(userId);
    this.initializeFormValidator();
  }

  initializeFormValidator() {
    const userInfo = this.userService.userInfo.get();
    if (userInfo) {
      this.formValidator = new ProfileFormValidator(userInfo);
    }
  }

}
