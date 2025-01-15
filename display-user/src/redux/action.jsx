export const FETCHED_DATA_SUCCESS = "FETCHED_DATA_SUCCESS";
export const FETCHED_DATA_FAIL = "FETCHED_DATA_FAIL";
export const FETCHED_DATA_REQUEST = "FETCHED_DATA_REQUEST";
import axios from "axios";

export const fetchUserData = (URL) => {
  return async (dispatch) => {
    dispatch({ type: FETCHED_DATA_REQUEST });
    try {
      let response = await axios.get(URL);
      dispatch({ type: FETCHED_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCHED_DATA_FAIL, payload: error.message });
    }
  };
};
