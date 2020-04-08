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

      console.log(data);

      this.speakers = data.speakers;
      this.sessions = data.sessions;

      console.log(this.speakers);
      console.log(this.sessions);

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

        //add opening p tag to bio
        this.speaker.bio = '<p>' + this.speaker.bio + '</p>';
        let find = '\r\n\r';
        var re = new RegExp(find, 'g');
        this.speaker.bio = this.speaker.bio.replace(re, '</p><p>');

        //Now lettuce display the leafy greens of the speaker's sessions below

        let speakerId = this.speaker.id;

        let newArray = this.sessions.filter(function (el) {
          return el.speakers.find(s => s==speakerId);
        });
        console.log(newArray);

      });

    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
