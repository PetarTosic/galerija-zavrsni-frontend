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
    ...middlewareActions,
  }
})

export const { setGalleries, performGalleriesSet, setGallery, performGallerySet } = gallerySlice.actions;

export default gallerySlice.reducer;