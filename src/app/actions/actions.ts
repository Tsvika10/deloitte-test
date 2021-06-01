import { createAction, props } from '@ngrx/store';
import { WeatherItem } from './../models/weather-item.model';
import { ActionType } from './action.types';

export const WeatherAction = createAction(ActionType.AddItem, props<{ payload: { item: WeatherItem } }>());

export const AddItem = (item: WeatherItem) => WeatherAction({ payload: { item } });
