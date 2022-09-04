import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperations";

const initialState = {
  user: { email: null },
  balance: null,
  token: null,
  categories: [],
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
    },
    [authOperations.logIn.fulfilled](state, action) {
      state.user.email = action.payload.email;
      state.balance = action.payload.balance;
      state.categories = [...action.payload.categories];
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.loginWithGoogle.fulfilled](state, action) {
      state.user.email = action.payload.email;
      state.balance = action.payload.balance;
      state.categories = [...action.payload.categories];
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.logOut.fulfilled](state, action) {
      state.user = { email: null };
      state.balance = null;
      state.categories = [];
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.fetchCurrentUser.pending](state) {
      state.isFetchingCurrentUser = true;
    },
    [authOperations.fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [authOperations.fetchCurrentUser.rejected](state) {
      state.isFetchingCurrentUser = false;
    },
  },
});
export default authSlice.reducer;
