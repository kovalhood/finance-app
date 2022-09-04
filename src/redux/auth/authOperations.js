import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';
axios.defaults.baseURL = "https://finance-wallet.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk("auth/register", async (credentials) => {
  try {
    const { data } = await axios.post("/api/auth/register", credentials);
    return data;
  } catch (error) {
    error?.response?.data?.email === "MongoError" &&
      Notify.failure(`User already exists.`);
  }
});
const logIn = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const { data } = await axios.post("/api/auth/login", credentials);
    data.user &&
      Notify.success(
        `Welcome back, ${
          data.user.email.split("@")[0]
        }! You are successfully Signed in.`,
        { position: "right" }
      );
    token.set(data.token);
    return data;
  } catch (error) {
    error?.response?.data &&
      Notify.failure(`wrong login or password, try again`);
  }
});

const loginWithGoogle = createAsyncThunk("auth/login", async (googleToken) => {
  token.set(googleToken);
  try {
    const { data } = await axios.get("/api/auth/current");

    return data;
  } catch (error) {
    error?.response?.data &&
      Notify.failure(`wrong login or password, try again`);
  }
});

const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/api/auth/logout");
    token.unset();
  } catch (error) {
    console.log(error);
  }
});
const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return state;
    }

    token.set(persistedToken);
    try {
      const { data } = await axios.get("/api/auth/current");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// const getCurrentUser = () => async (dispatch, getState) => {
//   const {
//     session: { token: persistedToken },
//   } = getState();

//   if (!persistedToken) {
//     return;
//   }

//   dispatch(authActions.getCurrentUserRequest());
//   try {
//     token.set(persistedToken);
//     const { data } = await axios.get('/users/current');
//     dispatch(authActions.getCurrentUserSuccess(data));
//   } catch (error) {
//     dispatch(authActions.getCurrentUserError(error.message));
//     refreshSession(dispatch, getState);
//   }
// };

// const refreshSession = async (dispatch, getState) => {
//   const {
//     session: { refreshToken: refToken, sid: id },
//   } = getState();

//   const credentials = { sid: id };
//   token.set(refToken);

//   dispatch(authActions.refreshSessionRequest());

//   try {
//     const data = await axios.post('/users/refresh', credentials);
//     dispatch(authActions.refreshSessionSuccess(data));
//     // loginSuccess();
//     token.unset();
//   } catch (error) {
//     dispatch(authActions.refreshSessionError(error.message));
//     // loginError();
//   }
// };

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
  loginWithGoogle,
  // getCurrentUser,
  // refreshSession,
};
export default operations;
