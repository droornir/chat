import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
// import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {MessagesService} from './messages.service';
import {Message} from '../models/message.model';
// import {UtilityService} from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // baseUrl = this.utilityService.getApiUrl();
  // messagesBaseUrl = this.baseUrl + '/api/messages';

  constructor(private messageService: MessagesService) { // TODO: add utilityService and httpClient as dependency
  }

  getChat(userName: string) {
    // const data = this.http.get<any>(this.messagesBaseUrl)
    //   .pipe(
    //     map(messages => {
    //       return messages;
    //     }),
    //     catchError(this.handleError)
    //   );
    return this.getMessages(userName).pipe(
      map(messages => {
          messages.sort((messageA, messageB) => {
            return (messageA.timeStamp > messageB.timeStamp) ? 1 : -1;
          });
          return messages;
        }
      )
    );
  }

  getMessages(userName: string): Observable<Message[]> {
    this.messageService.add(userName, `${userName} joined the chat`);
    return of(this.messageService.messages);
  }

  addNewMessage(userName: string, newMessage: string) {
    this.messageService.add(userName, newMessage);

  }

  // private handleError(error: HttpErrorResponse) {
  //   console.error('server error:', error);
  //   if (error.error instanceof Error) {
  //     const errMessage = error.error.message;
  //     return Observable.throw(errMessage);
  //     // Use the following instead if using lite-server
  //     // return Observable.throw(err.text() || 'backend server error');
  //   }
  //   return Observable.throw(error || 'Node.js server error');
  // }
}
