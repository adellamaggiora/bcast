import { Injectable } from "@angular/core";
import client from "src/api/client";
import { UserService } from "./user.service";
import { IMessage } from "src/interfaces/message";
import { Observable } from "rxjs";
import { utilsFns } from "src/functions/utils-fns";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  // usernames caching
  private _cache: Map<string, Map<string, { username: string, usernameColorHex: string }>> = new Map(); //{ [bcastId: string]: { [userId: string]: string } } = {};

  constructor(private userService: UserService) {}

  private async _cacheUsername(bcastId: string, userId: string) {
    if (this._cache.has(bcastId)) {
      const existingMap = this._cache.get(bcastId);
      if (!existingMap.has(userId)) {
        console.log('fetching username');
        const username = await client.userInfo.getUsername(userId);
        const usernameColorHex = utilsFns.generateUniqueColorHex(userId);
        existingMap.set(userId, { username, usernameColorHex });
      }
    }
    else {
      console.log('fetching username');
      const username = await client.userInfo.getUsername(userId);
      const usernameColorHex = utilsFns.generateUniqueColorHex(userId);
      const map = new Map([ [userId, { username, usernameColorHex }] ]);
      this._cache.set(bcastId, map);
    }
  }

  message = {
    send: async (bcastId: string, message: string) => {
      const userId = await this.userService.userSession.getUserId();
      return client.message.insert(userId, bcastId, message);
    },
    listen: (bcastId: string) => {
      return new Observable<IMessage>((subscriber) => {
        client.message.onInsert(bcastId, async (message: IMessage) => {
          await this._cacheUsername(message.bcastId, message.userId);
          subscriber.next(message);
        });
      });
    },
    getAll: (bcastId: string) => client.message.getAll(bcastId).then(async messages => {
      for (const message of messages) {
        const { bcastId, userId } = message;
        await this._cacheUsername(bcastId, userId); 
      }
      return messages;
    }),
    getUsername: (bcastId: string, userId: string) => this._cache.get(bcastId)?.get(userId)?.username,
    getUserColor: (bcastId: string, userId: string) => this._cache.get(bcastId)?.get(userId)?.usernameColorHex
  };
}
