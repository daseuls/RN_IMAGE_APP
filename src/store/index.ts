import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IImageItem, IImageItemState, IPageNumberState} from '../types';

export const imageInfoSlice = createSlice({
  name: 'imageInfoSlice',
  initialState: {value: []} as IImageItemState,
  reducers: {
    update: (state: IImageItemState, action: PayloadAction<IImageItem[]>) => {
      state.value = action.payload;
    },
  },
});

export const pageNumberSlice = createSlice({
  name: 'pageNumberSlice',
  initialState: {value: 2},
  reducers: {
    increase: (state: IPageNumberState, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    imageInfo: imageInfoSlice.reducer,
    pageNumber: pageNumberSlice.reducer,
  },
});
