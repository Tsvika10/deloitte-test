
import { WeatherItem } from './weather-item.model';

export interface WeatherState {
  items: WeatherItem[];
}

export interface AppState {
  weather: WeatherState;
}
