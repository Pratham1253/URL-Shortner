import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import urlsReducer from "./slice/urlSlice";

// seting up redux store for global storage
export default configureStore({
  reducer: {
    users: userReducer,
    urls: urlsReducer,
  },
});
