import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signUp } from "./userApi";

export const decode_jwt = (token) => {
  const base64Url = token.split(".")[1];
  const jsonStr = atob(base64Url);
  return JSON.parse(jsonStr);
};

const getName = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return "";
  const user = decode_jwt(token);
  return user.firstName + " " + user.lastName;
};

export const userSlice = createSlice({
  name: "users",
  initialState: {
    email: "",
    name: getName(),

    // for login api
    isLoggingIn: false,
    isLoginSuccess: false,
    loginError: "",

    // for signup api
    isSigningUp: false,
    isSignUpSuccess: false,
    signUpError: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearUserDetails: (state, action) => {
      state.isLoggingIn = false;
      state.isLoginSuccess = false;
      state.loginError = "";
      state.isSigningUp = false;
      state.isSignUpSuccess = false;
      state.signUpError = "";
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoggingIn = true;
      state.isLoginSuccess = false;
      state.loginError = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.isLoginSuccess = true;
      localStorage.setItem("accessToken", action.payload.data.accessToken);
      // decode jwt aceess toeken to extract payload
      const decoded = decode_jwt(action.payload.data.accessToken);
      state.email = decoded.username;
      state.name = decoded.firstName + " " + decoded.lastName;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.isLoginSuccess = false;
      state.loginError = action.payload.message;
    });

    // signup user
    builder.addCase(signUp.pending, (state, action) => {
      state.isSigningUp = true;
      state.isSignUpSuccess = false;
      state.signUpError = "";
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isSigningUp = false;
      state.isSignUpSuccess = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isSigningUp = false;
      state.isSignUpSuccess = false;
      state.signUpError = action.payload.message;
    });
  },
});

// this is for dispatch
export const { setEmail, clearUserDetails } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
