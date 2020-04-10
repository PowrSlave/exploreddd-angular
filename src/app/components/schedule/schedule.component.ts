import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../../services/data.service';

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

  constructor(private dataService: DataService,
              private renderer: Renderer2,
              private el: ElementRef) { }

  ngOnInit() {

    //if we go the json route
    // this.dataService.getSchedule().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
    //   console.log(data);
    //   this.scheduleBlob = JSON.stringify(data);
    // })


    //if we go the styled and embedded script tag route
    /*
    Utilizing this technique (http://blog.davidjs.com/2018/09/insert-script-tags-in-angular-components/)
    to embed a script tag in the component template
    */

    const s = this.renderer.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://sessionize.com/api/v2/lrqa96hc/view/GridSmart';
    s.text = ``;
    this.renderer.appendChild(this.el.nativeElement, s);

    // const div = this.renderer.createElement('div');
    // const text = this.renderer.createText('Hello world!');

    // this.renderer.appendChild(div, text);
    // this.renderer.appendChild(this.el.nativeElement, div);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
