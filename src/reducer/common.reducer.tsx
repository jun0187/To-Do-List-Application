import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface CommonState {
  isLoader: boolean;
}

const initialState: CommonState = {
  isLoader: false,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoader = action.payload;
    },
  },
});

export const {setIsLoader} = commonSlice.actions;

export default commonSlice.reducer;
