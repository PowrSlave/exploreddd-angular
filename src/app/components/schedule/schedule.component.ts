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

  sessions:Array<object>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getMockScheduleJSON().pipe(takeUntil(this.destroy$)).subscribe((data: Array<Speaker>)=>{
      //console.log(data);
      this.sessions = data;
      //console.log(this.sessions);

      //add height property (in px) based on session duration
      this.sessions.forEach(function(element:Session){
        var ms = moment(element.endsAt,"YYYY-MM-DD HH:mm:ss").diff(moment(element.startsAt,"YYYY-MM-DD HH:mm:ss"));
        var m = moment.duration(ms).asMinutes();
        element.pixelHeight = (`${(m*2.5)}px`); //duration (mins) multiplied by a factor of 2.5 to be compatible with 150px hour timeblock size
      });

      console.log(this.sessions.length);

      for (let i=0; i<this.sessions.length; i++) {
        if (i < this.sessions.length-1) {
          var ms = moment(this.sessions[i]['endsAt'],"YYYY-MM-DD HH:mm:ss").diff(moment(this.sessions[i+1]['startsAt'],"YYYY-MM-DD HH:mm:ss"));
          var m = moment.duration(ms).asMinutes();
          m *= -1;
          console.log(`the gap between current and next session is ${m} mins`);
        }
      }

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

}
