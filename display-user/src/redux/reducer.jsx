import {
  FETCHED_DATA_FAIL,
  FETCHED_DATA_REQUEST,
  FETCHED_DATA_SUCCESS,
} from "./action";

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_DATA_REQUEST:
      return { ...state, isLoading: true };

    case FETCHED_DATA_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };

    case FETCHED_DATA_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
