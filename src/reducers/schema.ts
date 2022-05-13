/* eslint-disable import/no-cycle */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { schema, ISchema } from '../schema';

const initialState: ISchema = schema;

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {},
});

export const selectSchema = (state: RootState) => state.schema;
export const selectSchemaSections = (state: RootState) => state.schema.sections;

export default schemaSlice.reducer;
