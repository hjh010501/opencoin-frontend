import { createSelector, current } from '@reduxjs/toolkit';
import { RootState } from 'types';

export const baseSelector = (state: RootState) => state.homepage;

const getUser = createSelector(
  baseSelector,
  state => state?.user
);

const getMyUpbitToken = createSelector(
  baseSelector,
  state => state?.user.upbit_jwt_token
);

const getIsLogin = createSelector(
  baseSelector,
  state => state?.is_login
);

const getMyAssetSelector = createSelector(
  baseSelector,
  state => state?.myAsset
);

const getAllCurrentAsset = createSelector(
  baseSelector,
  state => state?.currentAsset
);

const getCurrentAsset = (currency) => createSelector(
  baseSelector,
  state => state?.currentAsset.find(asset => asset.market === currency)
)

export { getUser, getMyUpbitToken, getIsLogin, getMyAssetSelector, getAllCurrentAsset, getCurrentAsset };