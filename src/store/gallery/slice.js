import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  performGalleriesSet: () => {},
  performGallerySet: () => {}
}

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleries: [],
    gallery: {}
  },
  reducers: {
    setGalleries: (state, action) => {
      state.galleries = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    ...middlewareActions,
  }
})

export const { setGalleries, performGalleriesSet, setGallery, performGallerySet } = gallerySlice.actions;

export default gallerySlice.reducer;