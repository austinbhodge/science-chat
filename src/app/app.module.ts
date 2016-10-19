import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routes';

import { PageNotFoundComponent } from './+pageNotFound/pageNotFound.component';
import { HomeComponent } from './+home/home.component';
import { ProfileComponent } from './+profile/profile.component';
import { SubjectComponent } from './+subject/subject.component';
import { SubjectListComponent } from './+subject/subjectlist/subjectlist.component';
import { ChatroomComponent } from './+subject/+chatroom/chatroom.component';

import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from "angularfire2";

const firebaseConfig = {
  apiKey: "AIzaSyC4pCB84kJ-t1MRszCwR-VEbmSRIN--gMM",
  authDomain: "science-chat.firebaseapp.com",
  databaseURL: "https://science-chat.firebaseio.com",
  storageBucket: "science-chat.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SubjectComponent,
    SubjectListComponent,
    ChatroomComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
