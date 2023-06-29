import { put, call, takeLatest } from "redux-saga/effects";
import { performGalleriesSet, setGalleries, performGallerySet, setGallery } from "./slice";
import { getGalleries, getGalleryById } from "../../service/GalleryService";

function* galleriesHandler() {
  try {
    const { data } = yield call(getGalleries);
    yield put(setGalleries(data.data));
  } catch (err) {
    console.log(err);
  }
}

function* galleryHandler(action) {
  try {
    const { data } = yield call(getGalleryById, action.payload);
    yield put(setGallery(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchSetGalleries() {
  yield takeLatest(performGalleriesSet.type, galleriesHandler);
}

export function* watchSetGallery() {
  yield takeLatest(performGallerySet.type, galleryHandler);
}