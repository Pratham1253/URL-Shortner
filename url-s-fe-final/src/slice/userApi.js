// redux thunk to call login api
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/auth";

export const loginUser = createAsyncThunk(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/signIn`, loginData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "users/signUp",
  async (signUpData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/signUp`, signUpData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
