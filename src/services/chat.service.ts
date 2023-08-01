import { Injectable } from '@angular/core';
import client from 'src/api/client';
import { UserService } from './user.service';
import { IMessage } from 'src/interfaces/message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private userService: UserService) { }

  message = {
    send: async (bcastId: string, message: string) => {
      const userId = await this.userService.userSession.getId();
      return client.message.insert(userId, bcastId, message);
    },
    listen: (bcastId: string) => {
      return new Observable<IMessage>(subscriber => {
        client.message.onInsert(bcastId, (message: IMessage) => {
          subscriber.next(message);
        })
      })
    },
    get: (bcastId: string) => client.message.get(bcastId)
  }

}
