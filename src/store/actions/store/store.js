import { ADD_STORE_SUCCESS, GET_ALL_STORES_SUCCESS, STORE_ERROR, STORE_FAIL, STORE_LOADER_START, STORE_LOADER_STOP } from "../../actionTypes/store";

export const storeLoaderStart = (payload) => {
    return {
      type: STORE_LOADER_START,
      payload,
    };
  };
  
  export const storeLoaderStop = () => {
    return {
      type: STORE_LOADER_STOP,
    };
  };
  
  export const storeError = (payload) => {
    return {
      type: STORE_ERROR,
      payload,
    };
  };
  
  export const storeFail = (payload) => {
    return {
      type: STORE_FAIL,
      payload,
    };
  };

  export const addStoreSuccess = (payload) => {
    return {
      type: ADD_STORE_SUCCESS,
      payload,
    };
  };

  export const getAllStoresSuccess = (payload) => {
    return {
      type: GET_ALL_STORES_SUCCESS,
      payload,
    };
  };