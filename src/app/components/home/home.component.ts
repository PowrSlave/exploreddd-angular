import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

//declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})
export class HomeComponent implements OnInit, OnDestroy {

  speakers:Array<any>;
  //speakers = [];
  topSpeakers = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    //homepage resize jquery/javascript likely should go here?
    // $(document).ready(function() {
    //   //console.log('hio! you hit the homepage module!');
    //   $(window).resize(function() {
    //     var bodyheight = $(this).height();
    //     var navheight = $('.navbar').outerHeight(true);
    //     var homepagetopbar = $('.homepage--top-bar').outerHeight(true);
    //     $("#sidebar").height(bodyheight);
    //     // console.log('height of window is ' + bodyheight);
    //     // console.log('height of nav div is ' + navheight);
    //     // console.log('height of homepage top bar div is ' + homepagetopbar);
    //     var videoheight = bodyheight - navheight - homepagetopbar;
    //     $(".homepage--hero-video-container").css("margin-top",homepagetopbar);
    //     $(".homepage--hero-video-container").css("height",videoheight);
    //   }).resize();
    // });

    //featured speakers sessionize GET
    this.dataService.getSpeakers().pipe(takeUntil(this.destroy$)).subscribe((data: any[])=>{
      console.log(data);
      this.speakers = data;

      this.topSpeakers = this.speakers.filter(speaker => speaker.isTopSpeaker);
      console.log(this.topSpeakers);
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
