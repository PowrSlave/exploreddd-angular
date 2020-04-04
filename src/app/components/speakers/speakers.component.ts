import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
  providers: [DataService]
})

export class SpeakersComponent implements OnInit, OnDestroy {

  speakers:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSpeakers().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      this.speakers = data;
      this.speakers.forEach(function(obj) {
        obj.linkParam = `${obj.firstName}-${obj.lastName}`
        obj.linkParam = obj.linkParam.toLowerCase();
      })
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
