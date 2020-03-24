import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {SpeakersComponent} from './components/speakers/speakers.component';
import {AboutComponent} from './components/about/about.component';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {CfpComponent} from './components/cfp/cfp.component';
import {WorkshopsComponent} from './components/workshops/workshops.component';
import {SponsorsComponent} from './components/sponsors/sponsors.component';
import {VenueComponent} from './components/venue/venue.component';
import {ScholarshipComponent} from './components/scholarship/scholarship.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'speakers', component: SpeakersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'cfp', component: CfpComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: 'sponsors', component: SponsorsComponent },
  { path: 'venue', component: VenueComponent },
  { path: 'scholarship', component: ScholarshipComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
