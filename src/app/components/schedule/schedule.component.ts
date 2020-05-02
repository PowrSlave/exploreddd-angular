import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Speaker } from './schedule.model';
import { Session } from './schedule.model';
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

  sessions:Array<Session>;
  sessionsByTrack:Array<any>;
  peopleByCountry:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMockScheduleJSON().pipe(takeUntil(this.destroy$)).subscribe((data: Array<Session>)=>{
      //console.log(data);
      this.sessions = data;

      //sort sessions by startDate
      this.sessions.sort((a, b) => (a.startsAt > b.startsAt) ? 1 : -1);

      //truncate long titles and add elipsis (...) so they dont break session containers

      this.sessions.forEach(function(element:Session){
        if (element.title.length > 60)
          element.title = element.title.substring(0,60) + '...';
      });

      //'Wednesday, September 16th...for exampe'
      this.sessions.forEach(function(element:Session){
        console.log(
          moment(element.startsAt).format('dddd, MMMM Do')
        );
      });

      let goldSessions= [];
      let greenSessions = [];
      let purpleSessions = [];
      let blueSessions = [];

      this.sessions.forEach(function(element:Session){
        switch (element.track) {
          case 'gold':
            goldSessions.push(element);
          break;
          case 'green':
            greenSessions.push(element);
          break;
          case 'purple':
            purpleSessions.push(element);
          break;
          case 'blue':
            blueSessions.push(element);
          break;
        }
      });

      //this needs to happen for each track coloured array (refactor later)
      this.computeSessionHeights(goldSessions);
      this.computeSessionBottomMargin(goldSessions);

      this.computeSessionHeights(greenSessions);
      this.computeSessionBottomMargin(greenSessions);

      this.computeSessionHeights(purpleSessions);
      this.computeSessionBottomMargin(purpleSessions);

      this.computeSessionHeights(blueSessions);
      this.computeSessionBottomMargin(blueSessions);


      this.sessionsByTrack = [
        { 'track': 'gold',
          'sessions': goldSessions
        },
        { 'track': 'green',
          'sessions': greenSessions
        },
        { 'track': 'purple',
          'sessions': purpleSessions
        },
        { 'track': 'blue',
          'sessions': blueSessions
        }
      ];

      //console.log(this.sessionsByTrack);

      //Schedule Page jQuery
      jQuery(function(){
        jQuery('.showSingle').click(function(){
          jQuery('.targetDiv').hide();
          jQuery('#div'+jQuery(this).attr('target')).fadeIn();
          });
      });

    });

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

  //calculate Session DOM Element Height Prior to drawing
  computeSessionHeights(trackColor:Array<any>) {
    trackColor.forEach(function(element:Session){
      var ms = moment(element.endsAt,"YYYY-MM-DD HH:mm:ss").diff(moment(element.startsAt,"YYYY-MM-DD HH:mm:ss"));
      var m = moment.duration(ms).asMinutes();
      element.pixelHeight = (`${(m*2.5)}px`); //duration (mins) multiplied by a factor of 2.5 to be compatible with 150px hour timeblock size
      //console.log(element.pixelHeight);
    });
  }

  //calculate Session bottom margin to get spacing correct
  computeSessionBottomMargin(trackColor:Array<any>) {
    for (let i=0; i<trackColor.length; i++) {
      if (i < trackColor.length-1) {
        var ms = moment(trackColor[i]['endsAt'],"YYYY-MM-DD HH:mm:ss").diff(moment(trackColor[i+1]['startsAt'],"YYYY-MM-DD HH:mm:ss"));
        var m = moment.duration(ms).asMinutes();
        m *= -1;
        trackColor[i].pixelMarginBottom = (`${(m*2.5)}px`); //duration (mins) multiplied by a factor of 2.5 to be compatible with 150px hour timeblock size
        //console.log(this.trackColor[i].pixelMarginBottom);
        //console.log(`the gap between current and next session is ${m} mins`);
      }
    }
  }

}
