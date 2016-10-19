import { Component } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user : any;
  profile : any;
  loggedIn = false;
  constructor(public af: AngularFire) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
        this.profile = this.af.database.object('/users/' + this.user.auth.uid);
        this.profile.set({
          username : user.auth.displayName.split(' ')[0],
          photoURL : user.auth.photoURL,
          education: 'Unknown',
          stylePrefs : {
                          background : "rgba(55, 55, 55, 0.1)",
                          border : "1px solid rgba(55, 55, 55, 0.75)"
                       }
        })
        this.loggedIn = true;
      }
      else {
        this.user = {};
        this.loggedIn = false;
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Google
    });
  }

  logout() {
    this.af.auth.logout();
    this.loggedIn = false;
  }
}
