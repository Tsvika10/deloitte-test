import { Action, createReducer, on } from '@ngrx/store';
import { WeatherAction } from '../actions/actions';
import { WeatherState } from '../models/state.model';

const initialState: WeatherState = {
  items: []
};

export const reducer = createReducer(initialState,
  on(WeatherAction, (state, { payload }) => ({
    ...state,
    items: [...state.items.concat(payload.item)]
  }))
);

export function weatherReducer(
  state: WeatherState | undefined,
  action: Action): WeatherState {
  return reducer(state, action);
}

