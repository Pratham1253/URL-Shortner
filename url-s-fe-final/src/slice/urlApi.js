import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL + "/urls";

export const createUrl = createAsyncThunk(
  "urls/createUrl",
  async (urlData, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, urlData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUrls = createAsyncThunk(
  "urls/fetchUrls",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "urls/deleteUrl",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(BASE_URL + "/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUrl = createAsyncThunk(
  "urls/updateUrl",
  async (url, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        BASE_URL + "/" + url.id,
        { shortUrl: url.shortUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
