import { Component, OnInit } from '@angular/core';
import { UserService } from "src/services/user.service";
import { Session } from '@supabase/supabase-js';
import { FormValidator } from 'src/models/form-validator';
import { ProfileFormValidator } from './profile-form-validator';
import { toast } from 'src/functions/notifiers/toast';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userSession: Session;
  formValidator: FormValidator;

  constructor(
    public userService: UserService,
    private chatService: ChatService,
    private router: Router
    ) { }

  ngOnInit() {
    this.readUserSession();
  }

  ionViewWillEnter() {
    this.initializeFormValidator();
  }

  async readUserSession() {
    this.userSession = await this.userService.userSession.get();
  }

  async save() {
    try {
      const username = this.formValidator.getFormControlValue('username');
      await this.userService.userInfo.setUsername(username);
      this.chatService.cache.clear();
      toast.success('Username updated');
      this.router.navigate(['bcast', 'list']);
    } catch (error) {
      toast.fail(error);
    }
  }

  async initializeFormValidator() {
    const userInfo = await this.userService.userInfo.get();
    this.formValidator = new ProfileFormValidator(userInfo);
  }


}
