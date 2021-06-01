import { Component, OnInit } from '@angular/core';
import { WeatherItem } from './models/weather-item.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherApiService } from './services/wheather-api.service';
import { Store } from '@ngrx/store';
import { AddItem } from './actions/actions';
import { AppState } from './models/state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private itemId = 0;
  title = 'deloitte-test';
  weatherFormItems: FormArray = new FormArray([
    new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
      units: new FormControl('', [Validators.required]),
      id: new FormControl(this.newId())
    })
  ]);
  cities: string[] = ['Tel Aviv', 'Kyiv'];

  constructor(public weatherApiService: WeatherApiService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  public submitItem(item: FormGroup): void {
    item.get('units')?.markAsTouched();
    item.get('city')?.markAsTouched();
    if (item.valid) {
      this.weatherFormItems.push(
        new FormGroup({
          city: new FormControl('', [Validators.required]),
          units: new FormControl('', [Validators.required]),
          id: new FormControl(this.newId())
        })
      );
      this.weatherApiService.getCity(item.value.city, item.value.units, item.value.id).subscribe(fetchedItem => {
        this.store.dispatch(AddItem(fetchedItem));
      });
    }
  }

  getControlGroup(i: number): FormGroup {
    return this.weatherFormItems.at(i) as FormGroup;
  }

  getCity(id: number): Observable<WeatherItem | null> {
    return this.store.select((state) => state.weather.items?.find(i => i.id === id) ?? null);
  }

  getCities(): Observable<WeatherItem[]> {
    return this.store.select((state) => { console.log(state); return state.weather.items; });
  }

  newId(): number {
    return this.itemId++;
  }

}
