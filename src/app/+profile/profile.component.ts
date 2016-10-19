import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'science-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profile: FirebaseObjectObservable<any>;
  constructor(public af: AngularFire, private router: Router, private route : ActivatedRoute, private location: Location) {

  }

  ngOnInit(){
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      let search = '/users/' + id;
      this.profile = this.af.database.object(search);
    })
  }


}
