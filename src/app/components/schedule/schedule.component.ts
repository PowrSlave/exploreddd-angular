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

    const myIframe = document.getElementById("myIframe");
      myIframe.onload = () => {
        var myTimeout = setInterval(function() {
          const dynamicElement = myIframe.contentWindow.document.getElementById("sessionize");
          if (myIframe.contentWindow.document.body.contains(dynamicElement)) {
            console.log('sessionize has emerged!');
            console.log(dynamicElement);
            //console.log(myIframe.contentWindow.document.getElementById("sessionize").offsetHeight);
            // let myIframeHeight = myIframe.contentWindow.document.body.clientHeight+'px';
            console.log( jQuery('#myIframe').contents().height() + ' is the height' );
            let myIframeHeight = jQuery('#myIframe').contents().height() + 500 + 'px'; //adding 500? eww.
            //console.log(myIframeHeight);
            document.getElementById("myIframe").style.height = myIframeHeight;
            clearInterval(myTimeout);
          }
        }, 100);
      }
  }

  ngOnDestroy() {

  }

}
