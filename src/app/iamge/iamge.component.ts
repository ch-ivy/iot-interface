import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './iamge.component.html',
  styleUrls: ['./iamge.component.scss']
})
export class IamgeComponent implements OnInit {

  barChartLabels: Label[];
  barChartData: ChartDataSets[] = [];

  constructor(private modal: NgbModal, private api: ApiService) { }

  async ngOnInit() {
    const datePipe = new DatePipe('en-US');
    this.barChartData['label'] = "temperature";
    await this.api.getData('London').subscribe(data => {
      this.barChartLabels = data['list'].map(datum => (datePipe.transform(datum.dt, 'EEEE, MMMM d')));
      this.barChartData = data['list'].map(datum => ({ data: datum.main.temp }));
    })
  }


  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  open(content, city) {
    this.modal.open(content, { centered: true, size: 'xl' });
    alert(city);
  }

}

