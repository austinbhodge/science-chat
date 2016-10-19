import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './+pageNotFound/pageNotFound.component';
import { HomeComponent } from './+home/home.component';
import { ProfileComponent } from './+profile/profile.component';
import { SubjectComponent } from './+subject/subject.component';
import { SubjectListComponent } from './+subject/subjectlist/subjectlist.component';
import { ChatroomComponent } from './+subject/+chatroom/chatroom.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'subject/:id', component: SubjectComponent,
    children: [
          { path: '', component: SubjectListComponent },
          { path: 'topic/:topic', component: ChatroomComponent},
        ] },
  { path: 'profile/:id', component: ProfileComponent},
  { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
