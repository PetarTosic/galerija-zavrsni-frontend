import { API } from "../shared/api";

export const getGalleries = (params) => {
  return API.get(`/galleries`, {params});
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

export const postComment = (description, user_id, gallery_id) => {
  return API.post("/comments", {
    description,
    user_id,
    gallery_id
  })
};

export const deleteComment = (id) => {
  return API.delete(`/comments/${id}`);
}

export const deleteGallery = (id) => {
  return API.delete(`/galleries/${id}`);
}

export const postGallery = (gallery) => {
  return API.post('/galleries', gallery);
}

export const updateGallery = (gallery, id) => {
  console.log(gallery, id);
  return API.put(`/galleries/${id}`, gallery);
}