import { Component, OnInit } from '@angular/core';
import {StatisticsService} from "../../services/statistics-service/statistics.service";
import {Statistics} from "../../models/statistics";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  statistics:Statistics

  constructor(private statsService:StatisticsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({data})=> {
      if(data != null)
      {
        this.statistics = data;
      }
    })
  }

}
