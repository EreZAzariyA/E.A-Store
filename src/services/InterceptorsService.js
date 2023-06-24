import axios from "axios";
import store from "../redux/store";
import { getError } from "../utils/helpers";

class InterceptorsService {

  createInterceptors = () => {
    axios.interceptors.request.use((request) => {
      if(store.getState().authReducer?.token) {
        request.headers = {
          authorization: "Bearer " + store.getState().authReducer.token,
        };
      };
      return request;
    });

    axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401) {
        console.log(getError(error));
      }
      return error
    });
  };
};

const interceptorsService = new InterceptorsService();

export default interceptorsService;

