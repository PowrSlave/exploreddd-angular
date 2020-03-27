import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DataService]
})
export class ScheduleComponent implements OnInit, OnDestroy {

  schedule:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  scheduleBlob:String;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getSchedule().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.scheduleBlob = JSON.stringify(data);
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
