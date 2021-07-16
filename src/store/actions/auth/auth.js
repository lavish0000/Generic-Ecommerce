import { deleteDataFromCookie } from '../../../utils/sessionHandler';
import { AUTH_CHECK_STATE_SUCCESS } from '../../actionTypes/store';
import {AUTH_ERROR, AUTH_FAIL, AUTH_LOADER_START, AUTH_LOADER_STOP, AUTH_LOGOUT, AUTH_VERIFY_SUCCESS} from './../../actionTypes/auth';

export const authLoaderStart = () => {
  return {
    type: AUTH_LOADER_START,
  };
};

export const authLoaderStop = () => {
  return {
    type: AUTH_LOADER_STOP,
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    error,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error,
  };
};

export const authVerifySuccess = (payload) => {
  return {
    type: AUTH_VERIFY_SUCCESS,
    payload,
  };
};

export const authCheckStateSuccess = (payload) => {
  return {
    type: AUTH_CHECK_STATE_SUCCESS,
    payload,
  };
};

export const logout = (token) => {
  deleteDataFromCookie("access_token");
  deleteDataFromCookie("admin_id");
  deleteDataFromCookie("user_data");
  return {
    type: AUTH_LOGOUT,
  };
};