import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-map',
  templateUrl: './iamge.component.html',
  styleUrls: ['./iamge.component.scss']
})

export class IamgeComponent implements OnInit, OnDestroy {

  temp1; temp2; temp3; temp4; temp5; temp6;
  sub;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.sub = this.api.getData('London').subscribe(data => {
      this.temp1 = data['list'][0].main.temp - 273.5;
    });
    this.sub = this.api.getData('Lagos').subscribe(data => {
      this.temp2 = data['list'][0].main.temp - 273.5;
    });
    this.sub = this.api.getData('Istanbul').subscribe(data => {
      this.temp3 = data['list'][0].main.temp - 273.5;
    });
    this.sub = this.api.getData('Rome').subscribe(data => {
      this.temp4 = data['list'][0].main.temp - 273.5;
    });
    this.sub = this.api.getData('Barcelona').subscribe(data => {
      this.temp5 = data['list'][0].main.temp - 273.5;
    });
    this.sub = this.api.getData('Los Angeles').subscribe(data => {
      this.temp6 = data['list'][0].main.temp - 273.5;
    });
  }


  open(s) {
    console.log(s);
    this.router.navigate([s], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}

