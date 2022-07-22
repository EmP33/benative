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
  openLessonDrawer: boolean;
  isSound: boolean;
  badgeModalShow: boolean;
  unlockedBadge: string | null;
}

/* Defining the initial state of the reducer. */
const initialState: IInitialState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  openLessonDrawer: false,
  isSound: true,
  badgeModalShow: false,
  unlockedBadge: null,
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
      state.isLoading = state.isLoading === false ? true : false;
    },
    toggleOpenLessonDrawer(state) {
      state.openLessonDrawer = state.openLessonDrawer === false ? true : false;
    },
    toggleSound(state) {
      state.isSound = state.isSound === false ? true : false;
    },
    toggleBadgeModal(state, action: PayloadAction<string | null>) {
      state.badgeModalShow = state.badgeModalShow === false ? true : false;
      state.unlockedBadge = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
