import axios from "axios";
import { useContext, useEffect } from "react";
import { Contextapi } from "../Authprovider/Authprovider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5173",
});

const useAxiosSecure = () => {
  const { user } = useContext(Contextapi);

  useEffect(() => {
    const reqInterceptors = axiosSecure.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptors = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        console.log(err);
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptors);

      axiosSecure.interceptors.response.eject(resInterceptors);
    };
  }, [user?.accessToken]);
  return axiosSecure;
};

export default useAxiosSecure;
