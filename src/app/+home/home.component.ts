import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'science-panels',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  subjects: FirebaseListObservable<any[]>;
  constructor(public af: AngularFire) {
    this.subjects = af.database.list('subjects');
    console.log(this.subjects);
  }

}
