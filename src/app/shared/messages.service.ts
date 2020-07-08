import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor() {
  }

  messages: Message[] = [];

  add(userName: string, message: string) {
    const newMessage = new Message(Date.now(), userName, message);
    this.messages.push(newMessage);
  }

  clear() {
    this.messages = [];
  }
}
