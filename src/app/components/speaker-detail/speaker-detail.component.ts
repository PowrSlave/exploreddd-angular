import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
    this.dataService.getSpeakers().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      //console.log(data);
      this.speakers = data;

      //lowercase first and last name for easier string comparison below
      this.speakers.forEach(s => {
        s.firstName = s.firstName.toLowerCase();
        s.lastName = s.lastName.toLowerCase();
      });

      this.route.paramMap.subscribe(params => {
        this.speakerParam = params.get('name');

        this.splitNameParam = this.speakerParam.split("-");
        this.splitFirstName = this.splitNameParam[0];
        this.splitLastName = this.splitNameParam[1];
        console.log(`${this.splitFirstName} ${this.splitLastName}`);

        this.speaker=this.speakers.find(s => s.firstName==this.splitFirstName && s.lastName==this.splitLastName);
      });

    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
