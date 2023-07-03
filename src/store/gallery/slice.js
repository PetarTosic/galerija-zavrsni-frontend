import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGalleriesSet: () => {},
  performGallerySet: () => {}
}

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    gallery: {},
    last_page: 0
  },
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload.data;
      state.last_page = action.payload.last_page;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    addGalleries: (state, action) => {
      state.galleries = [...state.galleries, ...action.payload.data];
    },
    ...middlewareActions,
  }
})

export const { addGalleries, setGalleries, performGalleriesSet, setGallery, performGallerySet } = gallerySlice.actions;

export default gallerySlice.reducer;