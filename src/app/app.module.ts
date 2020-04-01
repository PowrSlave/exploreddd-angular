import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CfpComponent } from './components/cfp/cfp.component';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { VenueComponent } from './components/venue/venue.component';
import { ScholarshipComponent } from './components/scholarship/scholarship.component';
import { SpeakerDetailComponent } from './components/speaker-detail/speaker-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpeakersComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    ScheduleComponent,
    CfpComponent,
    WorkshopsComponent,
    SponsorsComponent,
    VenueComponent,
    ScholarshipComponent,
    SpeakerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
