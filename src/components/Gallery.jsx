import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { performGallerySet } from "../store/gallery/slice";
import { selectGallery } from "../store/gallery/selectors";
import Carousel from "react-bootstrap/Carousel";
import { selectAllUsers, selectLogedUser } from "../store/user/selectors";
import { performAllUsersSet } from "../store/user/slice";
import { deleteComment, postComment } from "../service/GalleryService";

const Gallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const users = useSelector(selectAllUsers);
  const [urls, setUrls] = useState([]);
  const [commDescription, setComDescription] = useState("");
  const logedUser = useSelector(selectLogedUser);

  useEffect(() => {
    dispatch(performAllUsersSet());

    if (Object.keys(gallery).length === 0) {
      dispatch(performGallerySet(id));
    } else {
      setUrls(gallery.urls.split(","));
    }
    document.title = gallery.name;
  }, [gallery]);

  const setName = () => {
    if (gallery.user) {
      return `${gallery.user.first_name} ${gallery.user.last_name}`;
    }
  };

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  };

  const storeComment = () => {
    postComment(commDescription, logedUser.id, id);
    setComDescription("");
  };

  const setDescription = (e) => {
    setComDescription(e.target.value);
  }

  const setButton = (user_id, id) => {
    if(user_id === logedUser.id) {
      return <button className="btn btn-danger" onClick={() => deleteCom(id)}>Delete</button>
    }
  }
  const deleteCom = (id) => {
    console.log(id);
    deleteComment(id);
  }

  const setComments = () => {
    if (Object.keys(gallery).length !== 0) {
      return gallery.comments.map((comment) => {
        return (
          <div
            style={{
              border: "2px solid black",
              width: "60vw",
              padding: "8px",
              margin: "10px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {users.find((user) => user.id === comment.user_id).first_name}{" "}
                {users.find((user) => user.id === comment.user_id).last_name}
              </div>
              <div>{dateFunc(comment.created_at)}</div>
            </div>
            <div style={{marginTop: "5px", display: "flex", justifyContent: "space-between"}}>
              <div>{comment.description}</div>
              {setButton(comment.user_id, comment.id)}
            </div>
          </div>
        );
      }).reverse();
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Link
        className="btn btn-secondary"
        style={{
          border: "2px solid black",
          borderRadius: "15px",
          margin: "5px",
          padding: "8px",
        }}
      >
        Author: {setName()}
      </Link>
      <Carousel style={{ width: "60vw" }}>
        {urls.map((url, i) => {
          return (
            <Carousel.Item key={i}>
              <img
                style={{ borderRadius: "15px" }}
                className="d-block w-100"
                src={url}
                alt="slider image"
              />
              <Carousel.Caption>
                <h3>{gallery.name}</h3>
                <p>{gallery.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div
        style={{
          margin: "10px",
          border: "2px solid black",
          borderRadius: "20px",
          padding: "15px",
        }}
      >
        <div>Create Comment:</div>
        <textarea
          style={{ width: "58vw", marginTop: "5px" }}
          className="form-control"
          name="description"
          onChange={setDescription}
          value={commDescription}
          required
        ></textarea>
        <button
          onClick={storeComment}
          style={{ marginTop: "5px" }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      {setComments()}
    </div>
  );
};

export default Gallery;
