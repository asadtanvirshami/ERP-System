import { combineReducers, CombinedState, Reducer } from 'redux';
import userReducer from './userReducer';
import formReducer from './formReducer';

export interface RootState {
  user: any,
  form: any
}

const reducers: Reducer<CombinedState<RootState>> = combineReducers<RootState>({
  user: userReducer,
  form: formReducer,
});

export default reducers;
