import {
  createSlice,
  PayloadAction,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";
// Types
import { WordType } from "../data.types";

/* Defining the shape of the initial state. */
interface IInitialState {
  data: any;
  dataError: boolean;
  words: WordType[];
}

/* Defining the initial state of the reducer. */
const initialState: IInitialState = {
  data: null,
  dataError: false,
  words: [],
};

const dataSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    setError(state) {
      state.dataError = true;
    },
    removeError(state) {
      state.dataError = false;
    },
    setWords(state, action: PayloadAction<any>) {
      state.words = action.payload;
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
        if (!data) return dispatch(dataActions.setError());
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

export const updateWords = (uid: string, words: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      set(ref(database, `users/${uid}/data/words`), words);
    };
    await sendRequest();
  };
};
export const updateWord = (uid: string, word: any, index: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      set(ref(database, `users/${uid}/data/words/${index}`), word);
    };
    await sendRequest();
  };
};

export const updatePoints = (uid: string, points: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      set(ref(database, `users/${uid}/data/points`), points);
    };
    await sendRequest();
  };
};

export const dataActions = dataSlice.actions;
export default dataSlice;
