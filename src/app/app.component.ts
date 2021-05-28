import { Component, OnInit } from '@angular/core';
import { WeatherItem } from './models/weather-item.model';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherApiService } from './services/wheather-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private itemId = 0;
  title = 'deloitte-test';
  weatherItems: WeatherItem[] = [];
  weatherFormItems: FormArray = new FormArray([
    new FormGroup({
      city: new FormControl('', [Validators.required, Validators.minLength(1)]),
      units: new FormControl('', [Validators.required]),
      id: new FormControl(this.newId())
    })
  ]);
  cities: string[] = ['Tel Aviv', 'Kyiv'];

  constructor(public weatherApiService: WeatherApiService) {
  }

  ngOnInit(): void {
  }

  public submitItem(item: FormGroup): void {
    item.get('units')?.markAsTouched();
    item.get('city')?.markAsTouched();
    if (item.valid) {
      this.weatherApiService.addCity(item.value.city, item.value.units, item.value.id);
      this.weatherFormItems.push(
        new FormGroup({
          city: new FormControl('', [Validators.required]),
          units: new FormControl('', [Validators.required]),
          id: new FormControl(this.newId())
        })
      );
    }
  }

  getControlGroup(i: number): FormGroup {
    return this.weatherFormItems.at(i) as FormGroup;
  }

  getCity(id: number): Observable<WeatherItem | null> | null {
    return this.weatherApiService.getCity(id);
  }

  getCities(): Observable<WeatherItem[]> {
    return this.weatherApiService.getCities();
  }

  newId(): number {
    return this.itemId++;
  }

}
