import { updateObject } from '../../../utils/commonFunctions';
import { AUTH_CHECK_STATE_SUCCESS } from '../../actionTypes/store';
import {AUTH_ERROR, AUTH_FAIL, AUTH_LOADER_START, AUTH_LOADER_STOP, AUTH_LOGOUT, AUTH_VERIFY_SUCCESS} from './../../actionTypes/auth'

const loaderStart = (state)  => updateObject(state, {loader: true}) ;
const loaderStop = (state)  => updateObject(state, {loader: false}) ;
const setError = (state, error)  => updateObject(state, {error}) ;
const fail = (state, error)  => updateObject(state, {error, loader: false});
const verifySuccess = (state, payload)  => updateObject(state, {...payload, loader: false}) ;
const logout = ()  => ({access_token: null, loader: false, error: null, language: "en"});
const checkState = (state) => updateObject(state, {auth_check_state: true}) ;

const functionMapper = {
  [AUTH_LOADER_START]: loaderStart,
  [AUTH_LOADER_STOP]: loaderStop,
  [AUTH_ERROR]: setError,
  [AUTH_FAIL]: fail,
  [AUTH_VERIFY_SUCCESS]: verifySuccess,
  [AUTH_LOGOUT]: logout,
  [AUTH_CHECK_STATE_SUCCESS]: checkState,
}
export default functionMapper