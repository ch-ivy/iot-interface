import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(city) {
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b84c27b911ede94ab8f8e26fbadcc903");
  }
}
