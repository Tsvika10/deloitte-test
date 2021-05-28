import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { WeatherItem } from './../models/weather-item.model';

const apiKey = '0d7303c17ee3d3482cd82a2ad273a90d';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  private cityList: WeatherItem[] = [];
  private WeatherSubject: BehaviorSubject<WeatherItem[]> = new BehaviorSubject<WeatherItem[]>(this.cityList);

  constructor() { }

  public getCity(id: number): Observable<WeatherItem | null> | null {
    if (id === null || id === undefined) {
      return null;
    }
    return this.WeatherSubject.asObservable().pipe(map(items => {
      return items.find(i => i.id === id) || null;
    }));
  }

  public getCities(): Observable<WeatherItem[]> {
    return this.WeatherSubject.asObservable();
  }

  public addCity: (city: string, metric: string, itemId: number) => void =
    (city: string, units: string, itemId: number) => from(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`))
      .pipe(
        switchMap(res => res.json())
      ).subscribe(data => {
        const newItem: WeatherItem = {
          iconUrl: data.weather[0].icon as string,
          description: data.weather[0].description as string,
          city: data.name as string,
          temp: data.main.temp as number,
          id: itemId
        };
        this.cityList.push(newItem);
        this.WeatherSubject.next(this.cityList);
      })

}
