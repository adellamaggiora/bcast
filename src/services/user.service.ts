import { Injectable } from "@angular/core";
import client from "src/api/client";
import { ChatService } from "./chat.service";

@Injectable({
  providedIn: "root",
})
export class UserService {

  private async _init() {
    const currentSession = await client.auth.getSession();
    if (currentSession) {
      await client.auth.refreshSession();
    }
  }

  constructor() {
    this._init();
  }

  public userInfo = {
    get: async () => {
      const userId = await this.userSession.getUserId();
      const userInfo = await client.userInfo.get(userId);
      return userInfo;
    },
    setUsername: async (username: string) => {
      const userId = await this.userSession.getUserId();
      await client.userInfo.setUsername(userId, username?.trim());
    }
  };

  public userSession = {
    get: client.auth.getSession,
    getUserId: () => client.auth.getSession().then((_) => _?.user?.id),
  };
  
}
