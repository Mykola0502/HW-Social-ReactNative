import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ email, password, login, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      // console.log("user", user);
      // console.log("auth.currentUser", auth.currentUser);

      if (user) {
        try {
          await updateProfile(user, {
            photoURL: avatar,
            displayName: login,
          });

          const { uid, displayName, email, photoURL } = await auth.currentUser;

          // console.log("displayName", displayName);

          // console.log("user", user);

          dispatch(
            updateUserProfile({
              userId: uid,
              avatar: photoURL,
              login: displayName,
              email,
            })
          );
        } catch (error) {
          console.log("updateError", error);
          console.log("updateError.message", error.message);
          throw error;
        }
      }
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      //   console.log("credentials", credentials);
      //   console.log("user", credentials.user);
      return credentials.user;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    // console.log("userStateChanged", user.photoURL);

    // setUser(user);
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          avatar: user.photoURL,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
