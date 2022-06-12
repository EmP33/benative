import {
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

/* Defining the shape of the initial state. */
interface IInitialState {
  user: any;
}

/* Defining the initial state of the user slice. */
const initialState: IInitialState = {
  user: undefined,
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
        .then((userCredential) => {})
        .catch((error) => {
          if (error.message.includes("email-already-in-use")) {
            return dispatch(uiActions.setError("Adres email jest już zajęty"));
          }
          dispatch(uiActions.setError(error.message));
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    };
    await sendRequest();
  };
};

export const loginUser = (email: string, password: string) => {
  console.log("working");
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          if (error.message.includes("user-not-found")) {
            return dispatch(uiActions.setError("Nie ma takiego użytkownika"));
          }
          if (error.message.includes("wrong-password")) {
            return dispatch(uiActions.setError("Błędne Hasło"));
          }
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
