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
  updateProfile,
  updateEmail,
  signOut,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";
// Types
import { LessonType, PartType } from "../data.types";

/* Defining the shape of the initial state. */
interface IInitialState {
  user: any;
  dataStatus: { status: boolean; type: string | null };
  currentLesson: LessonType | null;
  currentLessonPart: PartType | null;
}

/* Defining the initial state of the user slice. */
const initialState: IInitialState = {
  user: undefined,
  dataStatus: { status: false, type: null },
  currentLesson: null,
  currentLessonPart: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    changeDataStatus(state, action: PayloadAction<any>) {
      state.dataStatus = { status: true, type: action.payload };
    },
    resetDataStatus(state) {
      state.dataStatus = { status: false, type: null };
    },
    setCurrentLesson(state, action: PayloadAction<LessonType>) {
      state.currentLesson = action.payload;
    },
    setCurrentLessonPart(state, action: PayloadAction<PartType | null>) {
      state.currentLessonPart = action.payload;
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
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(uiActions.toggleIsLoading());
          // Signed in
          // const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          dispatch(uiActions.toggleIsLoading());
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

export const updateUsername = (name: string, avatar?: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      if (auth.currentUser === null) throw new Error("No user found");
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatar,
      })
        .then(() => {
          // Profile updated!
          // ...
          dispatch(userActions.fetchUser(auth.currentUser));
          dispatch(uiActions.toggleIsLoading());
          dispatch(userActions.changeDataStatus("username"));
        })
        .catch((error) => {
          dispatch(uiActions.setError(error.message));
          dispatch(uiActions.toggleIsLoading());
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
    };
    await sendRequest();
  };
};
export const updateUserEmail = (email: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      if (auth.currentUser === null) throw new Error("No user found");
      updateEmail(auth.currentUser, email)
        .then(() => {
          // Email updated!
          // ...
          dispatch(userActions.fetchUser(auth.currentUser));
          dispatch(uiActions.toggleIsLoading());
          dispatch(userActions.changeDataStatus("email"));
        })
        .catch((error) => {
          dispatch(uiActions.toggleIsLoading());
          if (error.message.includes("requires-recent-login")) {
            return dispatch(
              uiActions.setError("Zaloguj się ponownie by móc zresetować email")
            );
          }
          if (error.message.includes("email-already-in-use")) {
            return dispatch(uiActions.setError("Wybrany email jest zajęty"));
          }
          dispatch(uiActions.setError(error.message));
          // An error occurred
          // ...
        });
    };
    await sendRequest();
  };
};

export const logoutUser = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      if (auth.currentUser === null) throw new Error("No user found");
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    };
    await sendRequest();
  };
};

export const deleteAccount = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      if (auth.currentUser === null) throw new Error("No user found");
      deleteUser(auth.currentUser)
        .then(() => {
          // User deleted.
        })
        .catch((error) => {
          if (error.message.includes("requires-recent-login")) {
            return dispatch(
              uiActions.setError("Zaloguj się ponownie by usunąć konto")
            );
          }

          dispatch(uiActions.setError(error.message));
          // An error ocurred
          // ...
        });
    };
    await sendRequest();
  };
};

export const updateUserPassword = (newPassword: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const sendRequest = async () => {
      if (auth.currentUser === null) throw new Error("No user found");
      updatePassword(auth.currentUser, newPassword)
        .then(() => {
          // Update successful.
          dispatch(uiActions.toggleIsLoading());
          dispatch(userActions.changeDataStatus("update-password"));
        })
        .catch((error) => {
          dispatch(uiActions.toggleIsLoading());
          if (error.message.includes("requires-recent-login")) {
            return dispatch(
              uiActions.setError("Zaloguj się ponownie, aby zmienić hasło")
            );
          }
          dispatch(uiActions.setError(error.message));
          // An error ocurred
          // ...
        });
    };
    await sendRequest();
  };
};

export const userActions = userSlice.actions;
export default userSlice;
