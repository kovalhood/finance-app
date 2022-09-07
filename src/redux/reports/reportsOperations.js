import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getData = createAsyncThunk(
  'transactions/report',
  async (props, { rejectWithValue }) => {
    const { type, normalizeMonth: month, year } = props;
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
