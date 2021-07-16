import { updateObject } from '../../../utils/commonFunctions';
import {ADD_STORE_SUCCESS, GET_ALL_STORES_SUCCESS, STORE_ERROR, STORE_FAIL, STORE_LOADER_START, STORE_LOADER_STOP} from './../../actionTypes/store'

const loaderStart = (state, loader)  => updateObject(state, {loader}) ;
const loaderStop = (state)  => updateObject(state, {loader: false}) ;
const setError = (state, error)  => updateObject(state, {error}) ;
const fail = (state, error)  => updateObject(state, {error, loader: false});
const addStore = (state, store)  => updateObject(state, {stores: [store, ...state.stores], loader: false});
const getAllStores = (state, {stores, total_stores})  => updateObject(state, {stores, total_stores, loader: false});

const functionMapper = {
  [STORE_LOADER_START]: loaderStart,
  [STORE_LOADER_STOP]: loaderStop,
  [STORE_ERROR]: setError,
  [STORE_FAIL]: fail,
  [ADD_STORE_SUCCESS]: addStore,
  [GET_ALL_STORES_SUCCESS]: getAllStores,
}
export default functionMapper