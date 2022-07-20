import {configureStore, createSlice} from '@reduxjs/toolkit';
import {IImageItemState} from '../types';

export const imageInfoSlice = createSlice({
  name: 'imageInfoSlice',
  initialState: {value: []} as IImageItemState,
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    imageInfo: imageInfoSlice.reducer,
  },
});
