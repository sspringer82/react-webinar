import { createSlice } from '@reduxjs/toolkit';
import { ActionType, getType } from 'typesafe-actions';
import { RootState } from '../../app/store';
import { loginAction } from './login.actions';

type LoginState = {
  token: string;
  loginState: null | 'pending' | 'completed' | 'error';
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    loginState: null,
  } as LoginState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getType(loginAction.request), (state) => {
        state.loginState = 'pending';
      })
      .addCase(
        getType(loginAction.success),
        (state, action: ActionType<typeof loginAction.success>) => {
          state.loginState = 'completed';
          state.token = action.payload;
        }
      )
      .addCase(getType(loginAction.failure), (state) => {
        state.loginState = 'error';
      });
  },
});

export const selectToken = (state: RootState) => state.login.token;
export const selectLoginState = (state: RootState) => state.login.loginState;

export default loginSlice.reducer;
