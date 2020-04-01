import { Component, OnInit, OnDestroy } from '@angular/core';
import { Label, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { DatePipe } from '@angular/common';
import { ApiService } from '../api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  list: any;
  city: any;
  room: string;
  officeName: string;
  date = new Date();
  currentTemp: number;
  currentWeather: any;
  pressure: any;
  Humidity: any;
  Wind: any;
  icon: any;
  details: any;
  id: any;
  weathericon: string;
  sub;

  percentageOfFullRange: number;
  hue: number
  alpha: number

  ChartLabels: Label[];
  barChartData: ChartDataSets[] = [];
  Options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };


  //line chart
  lineChartData: ChartDataSets[] = [];
  lineChartColors: Color[] = [
    {
      borderColor: '#feb103',
      backgroundColor: 'transparent'
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  datePipe = new DatePipe('en-US');
  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.room = params.get('city');
      this.officeName = this.room === "Istanbul" ? "Reception" : this.room === "London" ? "Manager's Office" : this.room === "Lagos" ? "Tech Team" : this.room === "Barcelona" ? "Meeting Room" : this.room === "Los Angeles" ? "HR's Office" : "Cafeteria";
    });
    this.sub = this.api.getData(this.room).subscribe(data => {
      this.info(data);
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }

  async info(data) {
    this.city = data;
    this.currentTemp = data['list'][0].main.temp - 273.5;
    this.hue = this.currentTemp < 25 ? 200 : 5;

    document.documentElement.style.setProperty("--temp-rotation", `${this.currentTemp}deg`);
    document.documentElement.style.setProperty("--temp-hue", `${this.hue}`);

    this.currentWeather = data['list'][0].weather[0].main;
    this.details = data['list'][0].weather[0].description;
    this.icon = data['list'][0].weather[0].icon;
    this.id = data['list'][0].weather[0].id;
    this.weathericon = `wi wi-owm-${this.id}`;
    this.Wind = data['list'][0].wind.speed;
    this.pressure = data['list'][0].main.pressure;
    this.Humidity = data['list'][0].main.humidity;
    this.ChartLabels = data['list'].filter(word => data['list'].indexOf(word) % 5 === 0).map((datum) => { return this.datePipe.transform(datum.dt_txt, 'H:mm, EEE') });
    this.lineChartData = data['list'].filter(word => data['list'].indexOf(word) % 5 === 0).map(datum => ({ data: datum.main.temp - 273.5, label: 'Temperature over the week' }));
  }
}
