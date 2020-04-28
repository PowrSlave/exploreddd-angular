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
      console.log(this.sessions);

      //add height property (in px) based on session duration
      this.sessions.forEach(function(element:Session){
        //var ms = moment(end,"YYYY-MM-DD HH:mm:ss").diff(moment(start,"YYYY-MM-DD HH:mm:ss"));
        var ms = moment(element.endsAt).diff(moment(element.startsAt));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(s);
     })

    });

    //test to determine the duration of a session to see how much vertical space it should take
    var start  = "2020-09-18T11:45:00";
    var end = "2020-09-18T12:30:00";

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
