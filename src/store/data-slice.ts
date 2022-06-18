import {
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import { uiActions } from "./ui-slice";
// Types

/* Defining the shape of the initial state. */
interface IInitialState {
  data: any;
}

/* Defining the initial state of the reducer. */
const initialState: IInitialState = {
  data: null,
};

const dataSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
  },
});

export const createUser = (uid: string, data: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      const reference = ref(database, `users/${uid}`);
      set(reference, {
        id: uid,
        data: data,
      });
      dispatch(dataActions.setData(data));
    };
    await sendRequest();
  };
};

export const fetchUserData = (uid: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      const dataRef = ref(database, `users/${uid}`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (!data)
          return dispatch(uiActions.setError("Błąd przy wczytywaniu danych"));
        dispatch(dataActions.setData(data));
      });
    };
    await sendRequest();
  };
};

export const getData = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      const dataRef = ref(database, `data`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(dataActions.setData(data));
      });
    };
    await sendRequest();
  };
};

export const dataActions = dataSlice.actions;
export default dataSlice;
