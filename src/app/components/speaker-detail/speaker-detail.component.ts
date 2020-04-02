import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-speaker-detail',
  templateUrl: './speaker-detail.component.html',
  styleUrls: ['./speaker-detail.component.scss'],
  providers: [DataService]
})
export class SpeakerDetailComponent implements OnInit, OnDestroy {

  speakers:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSpeakers().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.speakers = data;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
