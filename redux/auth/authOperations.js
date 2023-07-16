import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      if (user) {
        try {
          await updateProfile(user, {
            displayName: login,
          });

          const { uid, displayName } = await auth.currentUser;

          // console.log("displayName", displayName);

          // console.log("user", user);

          dispatch(
            authSlice.actions.updateUserProfile({
              userId: uid,
              login: displayName,
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

export const authSignOutUser = () => async (dispatch, getState) => {};
