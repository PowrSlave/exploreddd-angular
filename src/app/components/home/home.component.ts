import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //homepage resize jquery/javascript likely should go here?
    $(document).ready(function() {
      //console.log('hio! you hit the homepage module!');
      $(window).resize(function() {
        var bodyheight = $(this).height();
        var navheight = $('.navbar').outerHeight(true);
        var homepagetopbar = $('.homepage--top-bar').outerHeight(true);
        $("#sidebar").height(bodyheight);
        // console.log('height of window is ' + bodyheight);
        // console.log('height of nav div is ' + navheight);
        // console.log('height of homepage top bar div is ' + homepagetopbar);
        var videoheight = bodyheight - navheight - homepagetopbar;
        $(".homepage--hero-video-container").css("margin-top",homepagetopbar);
        $(".homepage--hero-video-container").css("height",videoheight);
      }).resize();
    });
  }

}
