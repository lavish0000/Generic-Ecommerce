import React, { useLayoutEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import axiosInstance from "../../../services/api/axiosOrders";

const AxiosInterceptors = ({children}) => {

  const auth = useSelector(state => state.auth);

  useLayoutEffect(() => {
    const resInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        toast.error(err?.response?.data?.message || err?.message)
        return err;
      }
    );

    return () => axiosInstance.interceptors.response.eject(resInterceptor);
  }, []);

  useLayoutEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      (res) => {
        res.data.language = auth.language || "en";
        return res;
      },
      (err) => err,
    );

    return () => axiosInstance.interceptors.response.eject(reqInterceptor); 
  }, [auth.language])

  return <React.Fragment><Toaster/>{children}</React.Fragment>;
};

export default AxiosInterceptors;
