import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss'],
  providers: [DataService]
})

export class SpeakersComponent implements OnInit {

  items:Array<any>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((responseBody) => {
      console.log(responseBody);
    });
  }

}
