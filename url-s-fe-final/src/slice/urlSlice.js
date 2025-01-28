import { createSlice } from "@reduxjs/toolkit";
import { createUrl, fetchUrls, updateUrl } from "./urlApi";

export const urlSlice = createSlice({
  name: "urls",
  initialState: {
    isUrlCreated: false,

    allUrls: [],
  },
  reducers: {
    clearUserDetails: (state, action) => {},
    saveUpdatedUrl: (state, action) => {
      state.allUrls = state.allUrls.map((url) => {
        if (url._id === action.payload._id) {
          return action.payload;
        }
        return url;
      });
    },
  },
  extraReducers: (builder) => {
    // url create
    builder.addCase(createUrl.pending, (state, action) => {
      state.isUrlCreated = false;
    });
    builder.addCase(createUrl.fulfilled, (state, action) => {
      state.isUrlCreated = true;
    });
    builder.addCase(createUrl.rejected, (state, action) => {
      state.isUrlCreated = false;
      alert("Error creating url");
    });

    // fetch url
    builder.addCase(fetchUrls.pending, (state, action) => {
      state.allUrls = [];
    });
    builder.addCase(fetchUrls.fulfilled, (state, action) => {
      state.allUrls = action.payload.data;
    });
    builder.addCase(fetchUrls.rejected, (state, action) => {
      alert("Error fetching urls");
    });
  },
});

// this is for dispatch
export const { clearUserDetails, saveUpdatedUrl } = urlSlice.actions;

// this is for configureStore
export default urlSlice.reducer;
