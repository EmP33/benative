import {
  createSlice,
  PayloadAction,
  // Dispatch,
  // AnyAction,
} from "@reduxjs/toolkit";

/* Defining the shape of the initial state. */
interface IInitialState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

/* Defining the initial state of the reducer. */
const initialState: IInitialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
    removeError(state) {
      state.isError = false;
      state.errorMessage = "";
    },
    toggleIsLoading(state) {
      state.isLoading = state.isLoading ? true : false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
