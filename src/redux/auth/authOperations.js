import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://finance-wallet.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/api/auth/register', credentials);
    return data;
  } catch (error) {
    error?.response?.data?.email === 'MongoError' &&
      Notify.failure(`User already exists.`);
  }
});
const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials);
    data.user &&
      Notify.success(
        `Welcome back, ${
          data.user.email.split('@')[0]
        }! You are successfully Signed in.`,
        { position: 'right' }
      );
    token.set(data.token);
    return data;
  } catch (error) {
    error?.response?.data &&
      Notify.failure(`wrong login or password, try again`);
  }
});

const loginWithGoogle = createAsyncThunk('auth/login', async googleToken => {
  token.set(googleToken);
  try {
    const { data } = await axios.get('/api/auth/current');

    return data;
  } catch (error) {
    error?.response?.data &&
      Notify.failure(`wrong login or password, try again`);
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.get('/api/auth/logout');
    token.unset();
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});

const setBalance = createAsyncThunk('auth/balance', async balance => {
  try {
    const { data } = await axios.patch('/api/auth/balance', balance);
    return data;
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});

const addTransaction = createAsyncThunk(
  'transactions',
  async ({ transaction, type }) => {
    // const state = thunkAPI.getState();
    // const persistedToken = state.auth.token;
    // token.set(persistedToken);
    try {
      const { data } = await axios.post(
        `api/transactions/${type}`,
        transaction
      );
      return data;
    } catch (error) {
      Notify.failure(`${error.message}`);
    }
  }
);

const deleteTransaction = createAsyncThunk('transactions', async ({ id }) => {
  try {
    const { data } = await axios.delete(`api/transactions/${id}`);
    return data;
  } catch (error) {
    Notify.failure(`${error.message}`);
  }
});

const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get('/api/auth/current');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
  loginWithGoogle,

  setBalance,
  addTransaction,
  deleteTransaction,
};
export default operations;
