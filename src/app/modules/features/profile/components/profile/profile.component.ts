import { Component, OnInit } from '@angular/core';
import { UserService } from "src/services/user.service";
import { ProfileFormValidator } from './profile-form-validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  formValidator: ProfileFormValidator;
  newTag: string = '';

  ngOnInit() {
    // const userInfo = this.userService.userInfo.get();
    // this.formValidator = new ProfileFormValidator(userInfo);
  }

  addTag() {
    if (this.newTag.trim() !== '') {
      // this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  removeTag(index: number) {
    //this.tags.splice(index, 1);
  }

  save() {

  }

}
