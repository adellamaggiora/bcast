import { Component, OnInit } from '@angular/core';
import { UserService } from "src/services/user.service";
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  userSession: Session;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.readUserSession();
  }

  async readUserSession() {
    this.userSession = await this.userService.userSession.get();
  }

  async save() {
    console.log('@todo')
  }


}
