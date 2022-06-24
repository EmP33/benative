import {
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { ref, onValue, set, update } from "firebase/database";
import { database } from "../firebase";
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";
// Types
import { PartType } from "../data.types";

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

export const getLesson = (
  uid: string,
  category: string | undefined,
  lessonID: string | undefined,
  partID: string | undefined
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      const dataRef = ref(
        database,
        `users/${uid}/data/learning/${category}/${lessonID}/parts/${partID}`
      );
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        dispatch(userActions.setCurrentLessonPart(data));
      });
    };
    await sendRequest();
  };
};

export const updateLessonPart = (
  uid: string,
  category: string | undefined,
  lessonID: string | undefined,
  partID: string | undefined,
  data: any
) => {
  console.log(
    `users/${uid}/data/learning/${category}/${lessonID}/parts/${partID}`
  );
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      set(
        ref(
          database,
          `users/${uid}/data/learning/${category}/${lessonID}/parts/${partID}`
        ),
        data
      );
      dispatch(userActions.setCurrentLessonPart(data));
    };
    await sendRequest();
  };
};

export const updateLesson = (
  uid: string,
  category: string | undefined,
  lessonID: string | undefined,
  data: any
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      set(
        ref(database, `users/${uid}/data/learning/${category}/${lessonID}`),
        data
      );
      dispatch(userActions.setCurrentLesson(data));
    };
    await sendRequest();
  };
};

export const dataActions = dataSlice.actions;
export default dataSlice;
