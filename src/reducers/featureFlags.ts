/* eslint-disable import/no-cycle, no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { RootState } from '../store/store';
import {
  schema,
  IFeatureFlag,
} from '../schema';

export interface IFeatureFlagState {
  flags: IFeatureFlag[],
}

export interface IToggleFeatureFlagActionPayload {
  id: string

  parentId?: string

  isChecked: boolean
}

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

const initialState: IFeatureFlagState = {
  flags: getAllFeatureFlagsFromSchema(schema) as IFeatureFlag[],
};

const getPathToFlagFromStateAndIds = (state: IFeatureFlagState, id: IFeatureFlag['id'], parentId: IFeatureFlag['id'] | undefined): (string | number)[] => {
  const topLevelIdToUse = parentId || id;
  // @ts-ignore
  const indexOfTopLevelFlag = R.findIndex(R.propEq('id', topLevelIdToUse), state.flags);
  const pathToTopLevelFlag = ['flags', indexOfTopLevelFlag] as (string | number)[];

  if (!parentId) {
    return pathToTopLevelFlag;
  }

  const pathToChildFlag = [...pathToTopLevelFlag, 'childFeatureFlags'];

  const indexOfChildFlag = R.pipe(
    // @ts-ignore
    R.path(pathToChildFlag),
    R.findIndex(R.propEq('id', id)),
  )(state) as number;

  pathToChildFlag.push(indexOfChildFlag);

  return pathToChildFlag;
};

export const featureFlagsSlice = createSlice({
  name: 'featureFlags',
  initialState,
  reducers: {
    toggleFeatureFlag: (
      state: IFeatureFlagState,
      action: PayloadAction<IToggleFeatureFlagActionPayload>,
    ) => {
      const { id, parentId, isChecked } = action.payload;

      const pathToFlag = getPathToFlagFromStateAndIds(state, id, parentId);
      const stateWithFlagStateChanged = R.assocPath([...pathToFlag, 'isChecked'], isChecked, state);

      // We are disabling a parent flag, so disable all children
      if (!parentId && !isChecked) {
        const pathToChildFeatureFlags = [...pathToFlag, 'childFeatureFlags'];

        const childFlagsDisabled = R.pipe(
          R.pathOr([], pathToChildFeatureFlags),
          // @ts-ignore
          R.map(R.assoc('isChecked', false)),
        )(stateWithFlagStateChanged);

        return R.assocPath(
          pathToChildFeatureFlags,
          childFlagsDisabled,
        )(stateWithFlagStateChanged) as IFeatureFlagState;
      }

      return stateWithFlagStateChanged;
    },
  },
});

export const { toggleFeatureFlag } = featureFlagsSlice.actions;

export const selectIsFlagChecked = (id: IFeatureFlag['id'], parentId?: IFeatureFlag['id']) => (state: RootState) => {
  const pathToFlag = getPathToFlagFromStateAndIds(state.featureFlags, id, parentId);
  const flag = R.path<IFeatureFlag>(pathToFlag, state.featureFlags);
  return flag?.isChecked || false;
};

export default featureFlagsSlice.reducer;
