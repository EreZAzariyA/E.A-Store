import axios from "axios";
import store from "../redux/store";
import { logoutAction } from "../redux/slicers/auth-slicer";
import { getError } from "../utils/helpers";
import { message } from "antd";

class InterceptorsService {

  createInterceptors = () => {
    axios.interceptors.request.use((request) => {
      if(store.getState().auth?.token) {
        request.headers = {
          authorization: "Bearer " + store.getState().auth.token,
        };
      };
      return request;
    }, ((err) => {
      console.log(err);
    }));

    axios.interceptors.response.use((response) => {
      return response;
    }, (err) => {
      if (err.response.status === 401) {
        store.dispatch(logoutAction());
      };
      return message.error(getError(err));
    });
  };
};

export const interceptorsService = new InterceptorsService();