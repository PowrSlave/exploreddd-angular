import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss'],
  providers: [DataService]
})

export class WorkshopsComponent implements OnInit, OnDestroy {

  speakers:Array<any>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getSpeakers().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.speakers = data;
    });

  }



  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
