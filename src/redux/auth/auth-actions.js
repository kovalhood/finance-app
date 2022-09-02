import { createAction } from '@reduxjs/toolkit';

const actions = {
  refreshSessionRequest: createAction('auth/refreshSessionRequest'),
  refreshSessionSuccess: createAction('auth/refreshSessionSuccess'),
  refreshSessionError: createAction('auth/refreshSessionError'),

  getCurrentUserRequest: createAction('auth/getCurrentUserRequest'),
  getCurrentUserSuccess: createAction('auth/getCurrentUserSuccess'),
  getCurrentUserError: createAction('auth/getCurrentUserError'),

};

export default actions;
