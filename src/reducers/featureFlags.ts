/* eslint-disable import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '../store/store';
import {
  schema,
  IFeatureFlag,
} from '../schema';

// @ts-ignore
const getAndFlattenFeatureFlagGroupsInSchema = R.pipe(
  R.prop('featureFlagGroups'),
  // @ts-ignore
  R.flatten,
);

const getAllFeatureFlagsFromSchema = R.pipe(
  // @ts-ignore
  R.prop('sections'),
  R.map(getAndFlattenFeatureFlagGroupsInSchema),
  R.flatten,
);

export interface IFeatureFlagState {
  flags: IFeatureFlag[],
}

const initialState: IFeatureFlagState = {
  flags: getAllFeatureFlagsFromSchema(schema) as IFeatureFlag[],
};

export interface IToggleFeatureFlagActionPayload {
  id: string;

  parentId: string;

  isChecked: boolean
}

export const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleFeatureFlag: (
      state: IFeatureFlagState,
      action: PayloadAction<IToggleFeatureFlagActionPayload>,
    ) => {
      const { flags } = state;

      const indexOfFlag = R.findIndex(R.propEq('id', action.payload.id), flags);

      return R.assocPath(['flags', indexOfFlag, 'isChecked'], action.payload.isChecked, state);
    },
  },
});

export const { toggleFeatureFlag } = featureFlagsSlice.actions;

export const selectIsFlagChecked = (id: IFeatureFlag['id']) => (state: RootState) => {
  const { flags } = state.featureFlags;

  const flag = R.find<IFeatureFlag>(R.propEq('id', id), flags);
  return flag?.isChecked || false;
};

export default featureFlagsSlice.reducer;
