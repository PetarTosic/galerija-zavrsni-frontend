import { API } from "../shared/api";

export const getGalleries = () => {
  return API.get(`/galleries`);
};

export const createGallery = (name, description, urls, author_id) => {
  return API.post("/galleries", {
    name,
    description,
    urls,
    author_id,
  });
};

export const getGalleryById = (id) => {
  return API.get(`/galleries/${id}`);
};