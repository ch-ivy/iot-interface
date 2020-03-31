import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './iamge.component.html',
  styleUrls: ['./iamge.component.scss']
})
export class IamgeComponent implements OnInit {

  room: string;
  date = new Date();
  currentTemp;
  currentWeather;
  pressure;
  Humidity;
  Wind;
  ChartLabels: Label[];
  barChartData: ChartDataSets[] = [];
  Options: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  //line chart
  lineChartData: ChartDataSets[] = [];
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  //doughnut chart
  doughnutChartType: ChartType = 'pie';
  constructor(private modal: NgbModal, private api: ApiService) { }

  async ngOnInit() {
    const datePipe = new DatePipe('en-US');

    await this.api.getData('Poland').subscribe(data => {
      console.log(data);
      this.currentTemp = data['list'][0].main.temp - 273.5;
      this.currentWeather = data['list'][0].weather[0].main;
      this.Wind = data['list'][0].wind.speed;
      this.pressure = data['list'][0].main.pressure;
      this.Humidity = data['list'][0].main.humidity;
      this.ChartLabels = data['list'].slice(0, 10).map(datum => (datePipe.transform(datum.dt_txt, 'H:mm, EEE')));
      this.barChartData = data['list'].slice(0, 10).map(datum => ({ data: datum.main.humidity, label: 'Humidity' }));
      this.lineChartData = data['list'].slice(0, 10).map(datum => ({ data: datum.main.temp - 273.5, label: 'Temperature' }), 0, 10);
    });

  }


  open(content, city) {
    console.log(city);
    this.room = city;
    this.modal.open(content, { centered: true, size: 'xl' });
  }

}

