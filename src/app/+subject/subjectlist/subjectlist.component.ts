import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'science-subjectlist',
  templateUrl: './subjectlist.component.html',
  styleUrls: ['./subjectlist.component.css']
})
export class SubjectListComponent implements OnInit {
  subject: FirebaseObjectObservable<any>;
  topics: FirebaseListObservable<any>;
  newTopic = {
    users: [],
    chat : [],
    name : '',
    prerequisite : '',
    complexity: ''
  }
  constructor(public af: AngularFire, private router: Router, private route : ActivatedRoute, private location: Location) {

  }

  ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'] - 1;
    console.log('/subjects/' + id);
    let search = '/subjects/' + id + '/subject';
    this.subject = this.af.database.object(search);
    this.topics = this.af.database.list(search + '/topics', {
      query: {
        limitToLast: 10,
        orderByKey: true
      }
    });

    });
    this.subject.subscribe(
      subject => {console.log(subject)}
    )
  }

  lengthCouter(obj){
    let responses = 0;
    if(obj != undefined){
      responses = Object.keys(obj).length;
    }

    return responses;
  }

  addTopic(){
    this.topics.push({topic :this.newTopic});
    this.newTopic = {
        users: [],
        chat : [],
        name : '',
        prerequisite : '',
        complexity: ''
      }
  }


}
