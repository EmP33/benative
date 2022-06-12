import {
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

/* Defining the shape of the initial state. */
interface IInitialState {
  user: any;
}

/* Defining the initial state of the user slice. */
const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const createUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          dispatch(uiActions.setError(error.message));
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    };
    await sendRequest();
  };
};

export const userActions = userSlice.actions;
export default userSlice;
