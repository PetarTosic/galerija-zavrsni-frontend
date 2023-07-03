const selectAllGalleries = (state) => state.gallery.galleries;
const selectGallery = (state) => state.gallery.gallery;
const selectLastPage = (state) => state.gallery.last_page;

export { selectAllGalleries, selectGallery, selectLastPage };