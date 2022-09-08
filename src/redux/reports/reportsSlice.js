import { createSlice } from '@reduxjs/toolkit';
import { getData } from './reportsOperations';

const initialState = {
  transactions: [],
  type: 'expense',
  date: {},
  isLoading: false,
  error: null,
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    updateType(state, { payload }) {
      state.type = payload;
    },
    updateDate(state, { payload }) {
      state.date = { ...payload };
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, { payload }) => {
      state.transactions = [...payload.transactions];
      state.isLoading = false;
      state.error = null;

      console.log('payload', payload);
      console.log('payload.transactions', payload.transactions);
    },
    [getData.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getData.rejected]: (state, { payload }) => {
      state.transactions = [];
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { updateType, updateDate } = reportsSlice.actions;
