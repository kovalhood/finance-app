import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// axios.defaults.headers.common.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1ZDBmMjdhNzY1OWVjNjFjNDU0M2YiLCJpYXQiOjE2NjIzNzQ0ODF9.5yGY5kD74qDqWRCK9HRg3SOMiIwqCjz_u-t6Cnc7SxQ`;
// axios.defaults.baseURL = 'https://finance-wallet.herokuapp.com';

export const getData = createAsyncThunk(
  'transactions/report',
  async (props, { rejectWithValue, getState }) => {
    const { type, normalizeMonth: month, year } = props;
    const state = getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }
    axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;

    try {
      const { data } = await axios.get(
        `api/transactions/report/${type}?month=${month}&year=${year}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
