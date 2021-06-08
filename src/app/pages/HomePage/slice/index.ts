import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing 
import { HomepageState } from './types';
import { homepageSaga } from './saga';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { IMyAsset, ICurrentAsset } from "./types";

export const initialState: HomepageState = {
  is_login: false,
  user: {
    jwt: '',
    email: '',
    nickname: '',
    upbit_jwt_token: '',
  },
  myAsset: [],
  currentAsset: [],
  error: null,
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    doLogin(state, action) {
      state.is_login = true;
      state.user.jwt = action.payload.token;
      state.user.email = action.payload.user.email;
      state.user.nickname = action.payload.user.profile.nickname;
      state.user.upbit_jwt_token = action.payload.user.profile.upbit_jwt_token;
    },
    loadMyAsset(state) {
      state.myAsset = [];
    },
    myAssetLoaded(state, action: PayloadAction<IMyAsset[]>) {
      const myAsset = action.payload;
      state.myAsset = myAsset;
    },
    loadCurrentAsset(state) {
      state.currentAsset = [];
    },
    currentAssetLoaded(state, action: PayloadAction<ICurrentAsset[]>) {
      const currentAsset = action.payload;
      state.currentAsset = currentAsset;
    },
    realtimeCurrentAssetLoaded(state, action: PayloadAction<ICurrentAsset>) {
      const currentAsset = action.payload;
      if (currentAsset === undefined) return;
      const index = state.currentAsset.findIndex(coin => coin.market === currentAsset.code);
      state.currentAsset[index] = currentAsset;
      state.currentAsset[index].market = currentAsset.code;
      // state.currentAsset = currentAsset;
    },
    assetError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const { actions: homepageActions, reducer } = slice;

export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homepageSaga });
  return { actions: slice.actions };
};