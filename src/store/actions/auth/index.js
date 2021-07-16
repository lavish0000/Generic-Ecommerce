import { getDataFromCookie, saveDataInCookie } from './../../../utils/sessionHandler';
import { makeRequest } from './../../../services/api/apiHandlers'
import { API_TYPE } from '../../../utils/constants';
import { AUTH_LOGIN_ENDPOINT, AUTH_VERIFY_ENDPOINT } from '../../../utils/apiEndpoints';
import { authCheckStateSuccess, authFail, authLoaderStart, authLoaderStop, authVerifySuccess, logout } from './auth';
import { handleAxiosToken } from '../../../services/api/axiosOrders';


export const authCheckState = () => {
  return async (dispatch) => {
    const token = await getDataFromCookie("access_token");
    if (!token) {
      dispatch(logout());
    } else {
      const [admin_id, user_data] = await Promise.all([
        getDataFromCookie("userId"),
        getDataFromCookie("userData"),
      ]);
      handleAxiosToken(token);
      dispatch(authVerifySuccess({ admin_id, access_token: token, user_data }));
    }
    dispatch(authCheckStateSuccess())
  }
};

export const authCredentials = (user_data, response_function) => {
  return async (dispatch) => {
    dispatch(authLoaderStart());
    const [response, error] = await makeRequest({ type: API_TYPE.POST, endpoint: AUTH_LOGIN_ENDPOINT, data: user_data });
    response ? dispatch(authLoaderStop()) : dispatch(authFail(error));
    response && response_function(response.data);
  }
};

export const authVerify = (user_data, response_function) => {
  return async (dispatch) => {
    dispatch(authLoaderStart());
    const [response, error] = await makeRequest({ type: API_TYPE.POST, endpoint: AUTH_VERIFY_ENDPOINT, data: user_data });

    if (response) {
      const { admin_id, access_token, ...user_data } = response.data;
      response ? dispatch(authVerifySuccess({ admin_id, access_token, user_data })) : dispatch(authFail(error));
      response && response_function();
      handleAxiosToken(access_token);
      saveDataInCookie("access_token", access_token);
      saveDataInCookie("admin_id", admin_id);
      saveDataInCookie("user_data", user_data);
    }
  }
};