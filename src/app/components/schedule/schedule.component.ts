import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var jQuery: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  name = 'Set iframe source';
  url: string = "schedule-page/sessionizeSchedule.html";
  urlSafe: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {

    //trust the async loaded script pulled in via a static page nested in an iframe *sheesh*
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    /*
    Once IFRAME is loaded, poll for a known/expected tag to appear from the async load via sessionize endpoint
    */

   const scheduleIframe = <HTMLIFrameElement>document.getElementById("scheduleIframe");

    scheduleIframe.onload = () => {
      let myTimeout = setInterval(function() {
        const dynamicElement = scheduleIframe.contentWindow.document.getElementById("sessionize");
        if (scheduleIframe.contentWindow.document.body.contains(dynamicElement)) {
          setTimeout(function(){
            adjustIframeHeight();
          }, 1000);

          //onresize, adjust IFRAME height
          jQuery(window).resize(function() {
            adjustIframeHeight();
          });

          //Adjust IFRAME height when a schedule button (Wednesday, Thursday, etc) is clicked.
          jQuery('#scheduleIframe').contents().find('.sz-tabs__link').click(function(){
            adjustIframeHeight();
          });

          //a utility function to resize the iframe that can be called whenever needed
          function adjustIframeHeight() {
            let innerWindow = document.getElementsByTagName( 'iframe' )[ 0 ].contentWindow,
            innerElem = innerWindow.document.querySelector('#sessionize');
            let compStyles = innerWindow.getComputedStyle( innerElem, null );
            //let randomStySty = 'the elements height claims to be ' + compStyles.getPropertyValue('height');
            //console.log(randomStySty);
            document.getElementById("scheduleIframe").style.height = compStyles.getPropertyValue('height');
          };

          //modal needs repositioning after it opens
          jQuery('#scheduleIframe').contents().find('.sz-session__title a').click(function(){
            console.log('modal trigger...triggered');
          });

          clearInterval(myTimeout);
        }
      }, 100);
    }
  }

  ngOnDestroy() {

  }

}
