import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'science-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  topic: FirebaseObjectObservable<any>;
  subject: FirebaseObjectObservable<any>;
  chatlog: FirebaseListObservable<any>;
  user:any;
  profile:any;
  loggedIn:any;
  nickName: string;
  newMessage:string;

  constructor(public af: AngularFire, private router: Router, private route : ActivatedRoute, private location: Location) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.loggedIn = true;
        this.af.database.object('/users/' + this.user.uid).subscribe(
          profile => this.profile = profile
        );
      }
      else {
        this.user = {};
        this.loggedIn = false;
        this.af.database.object('/users/' + 'anon').subscribe(
          profile => this.profile = profile
        );
      }
    });
  }

  ngOnInit(): void {
    this.route.parent.params.forEach((params: Params) => {
      let id = +params['id'] - 1;
      console.log('/subjects/' + id);
      let search = '/subjects/' + id + '/subject';
      this.subject = this.af.database.object(search);
      this.route.params.forEach((params: Params) => {
        let topicid = params['topic'];
        console.log(search + '/topics/' + topicid + '/topic');
        this.topic = this.af.database.object(search + '/topics/' + topicid + '/topic');
        this.chatlog = this.af.database.list(search + '/topics/' + topicid + '/topic/chatlog');
        this.topic.subscribe(
          topic => console.log(topic)
        )
      })
    })
}
  enterCheck(code){
    if(code == 13){
      this.enterMessage();
    }
  }

  enterMessage(){
    let value = this.newMessage;

    this.chatlog.push({
                        value    : this.newMessage,
                        username : this.profile.username,
                        photoURL : this.profile.photoURL,
                        style    : this.profile.stylePrefs
                      })


    this.newMessage = '';
  }

}
