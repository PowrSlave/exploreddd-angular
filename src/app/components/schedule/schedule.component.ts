import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Config } from '../../services/data.service';
import * as moment from 'moment';

declare var jQuery: any;

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
            "bio": "Nick Tune bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test1.jpg",
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
            "bio": "Daniel Somerfields bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test3.jpg",
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
            "bio": "Another Speaker bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test5.jpg",
          }
        ]
      },
      {
        "title": "Why I Made the Internet",
        "description": "Keynote description placeholder text",
        "format": "Keynote",
        "startsAt": "2020-09-19T09:45:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "blue",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Al Gore",
            "tagLine": "Another Speaker Tagline",
            "bio": "Another Speaker bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test5.jpg",
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
            "bio": "Speaker McGee bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test8.jpg",
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
            "bio": "Dr. Speaker Speakalots bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test2.jpg",
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
            "bio": "Dr. Speaker Speakalots bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test7.jpg",
          }
        ]
      },
      {
        "title": "I'm a Builder of Great Tools, Not a Usability Expert!",
        "description": "some description",
        "format": "Talk",
        "startsAt": "2020-09-19T09:00:00",
        "endsAt": "2020-09-18T09:45:00",
        "track": "blue",
        "isServiceSession": false,
        "speakers": [
          {
            "fullName": "Linus Torvalds",
            "tagLine": "I need no tagline",
            "bio": "Dr. Speaker Speakalots bio placeholder",
            "profilePicture": "https://sessionize.com/image?f=c60d0ef66e02ee405bbe89ef29b7f626,400,400,1,0,test7.jpg",
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

    jQuery('#speakerModal').on('show.bs.modal', function (event) {
      var button = jQuery(event.relatedTarget) // Button that triggered the modal
      var speakerProfilePicture = button.data('speaker-profile-picture')
      var speakerName = button.data('speaker-name')
      var speakerBio = button.data('speaker-bio') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = jQuery(this)
      modal.find('.modal-speaker-profile-picture').attr("src",speakerProfilePicture)
      console.log(speakerProfilePicture)
      modal.find('.modal-title').text(speakerName)
      modal.find('.modal-body').text(speakerBio)
    })

    jQuery('#sessionModal').on('show.bs.modal', function (event) {
      var button = jQuery(event.relatedTarget) // Button that triggered the modal
      var speakerName = button.data('speaker-name')
      var sessionTitle = button.data('session-title')
      var sessionDescription = button.data('session-description') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = jQuery(this)
      modal.find('.modal-speaker-name').text(speakerName)
      modal.find('.modal-title').text(sessionTitle)
      modal.find('.modal-body').text(sessionDescription)
    })



  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
