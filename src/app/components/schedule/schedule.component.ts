import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Speaker } from './schedule.model';
import { Session } from './schedule.model';
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
  sessionsByTrackDay1:Array<any>;
  sessionsByTrackDay2:Array<any>;
  sessionsByTrackDay3:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMockScheduleJSON().pipe(takeUntil(this.destroy$)).subscribe((data: Array<Session>)=>{

      this.sessions = data;

      //sort sessions by startDate
      this.sessions.sort((a, b) => (a.startsAt > b.startsAt) ? 1 : -1);

      /*
      trim title lengths and save in a separate property so they don't wrap and take up
      too much space in the schedule view, but don't mutate the full title property value
      since it will be needed for the modal when clicked on
      */
      this.sessions.forEach(function(element:Session){
        if (element.title.length > 60) {
          element.titleSnipped = element.title.substring(0,60) + '...';
        } else {
          element.titleSnipped = element.title;
        }
      });

      //try fresh here

      let day1 = this.sessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Wednesday, September 16th');
      let day2 = this.sessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Thursday, September 17th');
      let day3 = this.sessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Friday, September 18th');

      //then split the day arrays up by colour

      let day1goldSessions = day1.filter(s => s.track === 'gold');
      let day1greenSessions = day1.filter(s => s.track === 'green');
      let day1purpleSessions = day1.filter(s => s.track === 'purple');
      let day1blueSessions = day1.filter(s => s.track === 'blue');

      let day2goldSessions = day2.filter(s => s.track === 'gold');
      let day2greenSessions = day2.filter(s => s.track === 'green');
      let day2purpleSessions = day2.filter(s => s.track === 'purple');
      let day2blueSessions = day2.filter(s => s.track === 'blue');

      let day3goldSessions = day3.filter(s => s.track === 'gold');
      let day3greenSessions = day3.filter(s => s.track === 'green');
      let day3purpleSessions = day3.filter(s => s.track === 'purple');
      let day3blueSessions = day3.filter(s => s.track === 'blue');

      //join all session track arrays together for computation of session heights and layout spacing between them
      let goldSessions = day1goldSessions.concat(day2goldSessions, day3goldSessions);
      let greenSessions = day1greenSessions.concat(day2greenSessions, day3greenSessions);
      let purpleSessions = day1purpleSessions.concat(day2purpleSessions, day3purpleSessions);
      let blueSessions = day1blueSessions.concat(day2blueSessions, day3blueSessions);

      //this needs to happen for each track coloured array (refactor later)
      this.computeSessionHeights(goldSessions);
      this.computeSessionBottomMargin(goldSessions);

      this.computeSessionHeights(greenSessions);
      this.computeSessionBottomMargin(greenSessions);

      this.computeSessionHeights(purpleSessions);
      this.computeSessionBottomMargin(purpleSessions);

      this.computeSessionHeights(blueSessions);
      this.computeSessionBottomMargin(blueSessions);

      //if you get the above working, now split them up again (eesh) and then assign appropriately below

      day1goldSessions = goldSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Wednesday, September 16th');
      day1greenSessions = greenSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Wednesday, September 16th');
      day1purpleSessions = purpleSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Wednesday, September 16th');
      day1blueSessions = blueSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Wednesday, September 16th');

      day2goldSessions = goldSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Thursday, September 17th');
      day2greenSessions = greenSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Thursday, September 17th');
      day2purpleSessions = purpleSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Thursday, September 17th');
      day2blueSessions = blueSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Thursday, September 17th');

      day3goldSessions = goldSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Friday, September 18th');
      day3greenSessions = greenSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Friday, September 18th');
      day3purpleSessions = purpleSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Friday, September 18th');
      day3blueSessions = blueSessions.filter(s => moment(s.startsAt).format('dddd, MMMM Do') === 'Friday, September 18th');

      //create structures for each day

      this.sessionsByTrackDay1 = [
        { 'track': 'gold',
          'sessions': day1goldSessions
        },
        { 'track': 'green',
          'sessions': day1greenSessions
        },
        { 'track': 'purple',
          'sessions': day1purpleSessions
        },
        { 'track': 'blue',
          'sessions': day1blueSessions
        }
      ];

      this.sessionsByTrackDay2 = [
        { 'track': 'gold',
          'sessions': day2goldSessions
        },
        { 'track': 'green',
          'sessions': day2greenSessions
        },
        { 'track': 'purple',
          'sessions': day2purpleSessions
        },
        { 'track': 'blue',
          'sessions': day2blueSessions
        }
      ];

      this.sessionsByTrackDay3 = [
        { 'track': 'gold',
          'sessions': day3goldSessions
        },
        { 'track': 'green',
          'sessions': day3greenSessions
        },
        { 'track': 'purple',
          'sessions': day3purpleSessions
        },
        { 'track': 'blue',
          'sessions': day3blueSessions
        }
      ];

    });

    //Schedule Page jQuery
    jQuery(function(){
      jQuery('.showSingle').click(function(){
        jQuery('.targetDiv').hide();
        jQuery('#div'+jQuery(this).attr('target')).fadeIn();

        jQuery('.schedule-btn').removeClass('activated');
        jQuery(this).addClass('activated');
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
    this.destroy$.unsubscribe();
  }

  //calculate Session DOM Element Height Prior to drawing
  computeSessionHeights(trackColor:Array<any>) {
    trackColor.forEach(function(element:Session){
      var ms = moment(element.endsAt,"YYYY-MM-DD HH:mm:ss").diff(moment(element.startsAt,"YYYY-MM-DD HH:mm:ss"));
      var m = moment.duration(ms).asMinutes();
      element.pixelHeight = (`${(m*2.5)}px`); //duration (mins) multiplied by a factor of 2.5 to be compatible with 150px hour timeblock size
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
      }
    }
  }

}
