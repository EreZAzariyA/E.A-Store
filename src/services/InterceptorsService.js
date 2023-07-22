import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/slicers/auth-slicer";
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
        store.dispatch(logout());
      };
      return message.error(getError(err));
    });
  };
};

const interceptorsService = new InterceptorsService();
export default interceptorsService;