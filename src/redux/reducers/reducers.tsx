import { combineReducers, CombinedState, Reducer } from 'redux';
import userReducer from './userReducer';
import formReducer from './formReducer';
import invoiceReducer from './invoiceReducer';

type UserState = {
  isAuthenticated: boolean;
  user: {};
  role: {};
  error: {};
};

type FormState = {
  value: {
    _id: string;
    info: boolean;
    edit: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    open: boolean;
    values: any[];  // Use appropriate type instead of any if possible
  };
};

type InvoiceState = {
  sale: string[];
  client: string[];
  invoice: string[];
};



export interface RootState {
  user: UserState,
  form: FormState,
  invoice:InvoiceState
}

const reducers: Reducer<CombinedState<RootState>> = combineReducers<RootState>({
  user: userReducer,
  form: formReducer,
  invoice: invoiceReducer,
});

export default reducers;
