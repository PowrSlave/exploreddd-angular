import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss'],
  providers: [DataService]
})
export class SpeakerDetailComponent implements OnInit, OnDestroy {

  speakers:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  speakerSessions:Array<any>;

  constructor(private dataService: DataService,
              private route: ActivatedRoute
              ) {
  }

  speaker;
  speakerParam;
  splitNameParam;
  splitFirstName;
  splitLastName;

  ngOnInit() {
    this.dataService.getAllData().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      // console.log(data);
      this.speakers = data.speakers;
      this.sessions = data.sessions;
      this.categories = data.categories[0].items;

      //lets make the name properties lowercase for easier matching
      this.speakers.forEach(s => {
        s.firstName = s.firstName.toLowerCase();
        s.lastName = s.lastName.toLowerCase();
      });

      this.route.paramMap.subscribe(params => {
        this.speakerParam = params.get('name');

        this.splitNameParam = this.speakerParam.split("-");
        this.splitFirstName = this.splitNameParam[0];
        this.splitLastName = this.splitNameParam[1];

        //grab the speaker we seek. This is the whole magic(tm) for the speaker-detail component logic
        this.speaker=this.speakers.find(s => s.firstName==this.splitFirstName && s.lastName==this.splitLastName);

      });

      //add opening p tag to speaker bio
      this.speaker.bio = '<p>' + this.speaker.bio + '</p>';
      let find = '\r\n\r';
      var re = new RegExp(find, 'g');
      this.speaker.bio = this.speaker.bio.replace(re, '</p><p>');

      //Now lettuce process the leafy greens of the speaker's sessions below

      let speakerId = this.speaker.id;

      this.speakerSessions = this.sessions.filter(function (item) {
        return item.speakers.find(s => s==speakerId);
      });

      this.speakerSessions.forEach(session => {
        session.type = this.categories.filter(function(item) {
          return item.id==session.categoryItems[0];
        });
      });

      this.speakerSessions.forEach(session => {
        switch(session.type[0].name) {
          case 'keynote':
            session.type[0].contentOrder = 1;
            break;
          case 'two-day-workshop':
            session.type[0].contentOrder = 2;
            break;
          case 'one-day-workshop':
            session.type[0].contentOrder = 3;
            break;
          case 'hands-on-session':
            session.type[0].contentOrder = 4;
            break;
          case 'talk':
            session.type[0].contentOrder = 5;
            break;
        }
      });

      console.log(this.speakerSessions);

      //add paragraphs to session descriptions
      this.speakerSessions.forEach(sesh => {
        sesh.description = '<p>' + sesh.description + '</p>';
        // let find = '\r\n\r';
        var re = new RegExp('\r\n\r', 'g');
        sesh.description = sesh.description.replace(re, '</this.sesh.description><p>');
      });

      //sort here to get the page appearance order correct
      //this.speakerSessions.sort((a, b) => (a.type[0].contentOrder > b.type[0].contentOrder) ? 1 : -1);
      //speakerSessions.sort((a, b) => (a.title > b.title) ? 1 : -1);

      console.log(this.speakerSessions);

    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
