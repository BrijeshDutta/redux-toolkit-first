import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import apiCallReducer from '../features/apicall/apiCallSlice';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/authentication/login/logonSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    apicall: apiCallReducer,
    loginUser:loginReducer,

  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
