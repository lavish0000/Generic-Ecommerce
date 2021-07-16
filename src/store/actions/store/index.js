import { makeRequest } from './../../../services/api/apiHandlers'
import { API_TYPE, LOADERS } from '../../../utils/constants';
import { GET_ALL_STORES_ENDPOINT, STORE_ADD_ENDPOINT } from '../../../utils/apiEndpoints';
import { addStoreSuccess, getAllStoresSuccess, storeFail, storeLoaderStart } from './store';

export const addStore = (store_data, response_function) => {
  return async (dispatch) => {
    dispatch(storeLoaderStart(LOADERS.ADD_STORE));
    const [response, error] = await makeRequest({ type: API_TYPE.POST, endpoint: STORE_ADD_ENDPOINT, data: store_data });

    if (response) {
      const store = {store_id: response.data.store_id, ...store_data};
      dispatch(addStoreSuccess(store));
      response_function(response.data);
      return;
    }
    dispatch(storeFail(error));
  }
};

export const getAllStores = (filter_data, response_function) => {
  return async (dispatch) => {
    dispatch(storeLoaderStart(LOADERS.GET_ALL_STORES));
    const [response, error] = await makeRequest({ type: API_TYPE.POST, endpoint: GET_ALL_STORES_ENDPOINT, data: filter_data });
    response ? dispatch(getAllStoresSuccess({stores: response.data.stores, total_stores: response.data.count})) : dispatch(storeFail(error));
    response && response_function && response_function(response.data);
  }
};