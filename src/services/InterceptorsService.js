import axios from "axios";
import store from "../redux/store";
import { getError } from "../utils/helpers";
import { logout, refreshToken } from "../redux/slicers/auth-slicer";

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
      const token = response.headers.get('authorization');
      if (token) {
        store.dispatch(refreshToken(token));
      };
      return response;
    }, (err) => {
      if (err.response.status === 401) {
        store.dispatch(logout());
      };
      return getError(err);
    });
  };
};

const interceptorsService = new InterceptorsService();

export default interceptorsService;

