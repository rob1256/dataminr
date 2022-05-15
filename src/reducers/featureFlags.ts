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

export interface IGetPathsToFlagsFromStateAndIds {
  pathToTopLevelFlag: (string | number)[]

  pathToChildFlag?: (string | number)[]
}

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

const initialState: IFeatureFlagState = {
  flags: getAllFeatureFlagsFromSchema(schema) as IFeatureFlag[],
};

const getPathsToFlagsFromStateAndIds = (state: IFeatureFlagState, id: IFeatureFlag['id'], parentId: IFeatureFlag['id'] | undefined): IGetPathsToFlagsFromStateAndIds => {
  const topLevelIdToUse = parentId || id;
  // @ts-ignore
  const indexOfTopLevelFlag = R.findIndex(R.propEq('id', topLevelIdToUse), state.flags);
  const pathToTopLevelFlag = ['flags', indexOfTopLevelFlag] as (string | number)[];

  if (!parentId) {
    return {
      pathToTopLevelFlag,
      pathToChildFlag: undefined,
    };
  }

  const pathToChildFlag = [...pathToTopLevelFlag, 'childFeatureFlags'];

  const indexOfChildFlag = R.pipe(
    // @ts-ignore
    R.path(pathToChildFlag),
    R.findIndex(R.propEq('id', id)),
  )(state) as number;

  pathToChildFlag.push(indexOfChildFlag);

  return {
    pathToTopLevelFlag,
    pathToChildFlag,
  };
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

      const pathsToFlags = getPathsToFlagsFromStateAndIds(state, id, parentId);

      // @ts-ignore
      const pathToFlag = R.ifElse(
        () => !!parentId,
        R.prop('pathToChildFlag'),
        R.prop('pathToTopLevelFlag'),
      )(pathsToFlags) as [];

      const stateWithFlagStateChanged = R.assocPath([...pathToFlag, 'isChecked'], isChecked, state);

      if (!parentId) {
        // TODO: disable all children as well
        const stateWithChildFlagsDisabled = R.pipe(
          R.path([...pathToFlag, 'childFeatureFlags'])
        )(stateWithFlagStateChanged);
      }

      return stateWithFlagStateChanged;
    },
  },
});

export const { toggleFeatureFlag } = featureFlagsSlice.actions;

export const selectIsFlagChecked = (id: IFeatureFlag['id'], parentId?: IFeatureFlag['id']) => (state: RootState) => {
  const pathsToFlags = getPathsToFlagsFromStateAndIds(state.featureFlags, id, parentId);

  // @ts-ignore
  const pathToFlag = R.ifElse(
    () => !!parentId,
    R.prop('pathToChildFlag'),
    R.prop('pathToTopLevelFlag'),
  )(pathsToFlags);

  // @ts-ignore
  const flag = R.path<IFeatureFlag>(pathToFlag, state.featureFlags);
  return flag?.isChecked || false;
};

export default featureFlagsSlice.reducer;
