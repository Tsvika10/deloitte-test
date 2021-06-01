import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WeatherItem } from './../models/weather-item.model';

const apiKey = '0d7303c17ee3d3482cd82a2ad273a90d';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor() { }

  public getCity: (city: string, metric: string, itemId: number) => Observable<WeatherItem> =
    (city: string, units: string, itemId: number) => from(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`))
      .pipe(
        switchMap(res => res.json()),
        map(data => ({
          iconUrl: data.weather[0].icon as string,
          description: data.weather[0].description as string,
          city: data.name as string,
          temp: data.main.temp as number,
          id: itemId
        } as WeatherItem))
      )

}
