import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Config } from '../../services/data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DataService]
})

export class ScheduleComponent implements OnInit, OnDestroy {

  //sessions:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  now = moment('2020-09-18T11:45:00').format('h:mm'); //this is the format we want for the date column

  data = {
    "sessions": [
      {
        "title": "Sociotechnical DDD",
        "description": "Sociotechnical description placeholder text",
        "format": "Talk",
        "startsAt": "2020-09-18T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "gold",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Nick Tune",
            "tagLine": "Nick Tune Tagline",
            "bio": "Nick Tune bio placeholder"
          }
        ]
      },
      {
        "title": "Domain-Driven Design in Data Engineering: a Journey of Application, Adaption, and Invention",
        "description": "Daniels talk description",
        "format": "Talk",
        "startsAt": "2020-09-18T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "green",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Daniel Somerfield",
            "tagLine": "Daniel Somerfields Tagline",
            "bio": "Daniel Somerfields bio placeholder"
          }
        ]
      },
      {
        "title": "Best Talk Ever",
        "description": "Keynote description placeholder text",
        "format": "Keynote",
        "startsAt": "2020-09-19T09:45:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "purple",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Bigtime Speaker Pants",
            "tagLine": "Another Speaker Tagline",
            "bio": "Another Speaker bio placeholder"
          }
        ]
      },
      {
        "title": "Sociotechnical DDD",
        "description": "Sociotechnical description placeholder text",
        "format": "Talk",
        "startsAt": "2020-09-19T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "gold",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Speaker McGee",
            "tagLine": "Speaker McGee Tagline",
            "bio": "Speaker McGee bio placeholder"
          }
        ]
      },
      {
        "title": "Domain-Driven Design in Data Engineering: a Journey of Application, Adaption, and Invention",
        "description": "Daniels talk description",
        "format": "Talk",
        "startsAt": "2020-09-19T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "green",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Dr. Speaker Speakalot",
            "tagLine": "Dr. Speaker Speakalots Tagline",
            "bio": "Dr. Speaker Speakalots bio placeholder"
          }
        ]
      },
      {
        "title": "A Talk of Sorts",
        "description": "some description",
        "format": "Talk",
        "startsAt": "2020-09-19T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "purple",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Dr. Speaker Speakalot II",
            "tagLine": "Dr. Speaker Speakalots Tagline",
            "bio": "Dr. Speaker Speakalots bio placeholder"
          }
        ]
      }
    ]
  };


  sessions = this.data.sessions;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //this.dataService.getAllData().pipe(takeUntil(this.destroy$)).subscribe((data: Config)=>{
      //console.log(data);
    //});


  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
