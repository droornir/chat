import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';

import { ChatService } from '../shared/chat.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  chat$: Observable<Message[]>;
  loggedInUserName: string;

  constructor(private chatService: ChatService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.loggedInUserName = paramMap.get('userName');
    });
    this.chat$ = this.chatService.getChat(this.loggedInUserName);
  }
  addNewMessage(newMessageForm: NgForm) {
    this.chatService.addNewMessage(this.loggedInUserName, newMessageForm.value.newMessage);
    newMessageForm.resetForm();
  }
}
