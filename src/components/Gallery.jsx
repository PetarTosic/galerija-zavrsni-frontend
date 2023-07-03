import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { performGallerySet } from "../store/gallery/slice";
import { selectGallery } from "../store/gallery/selectors";
import Carousel from "react-bootstrap/Carousel";
import { selectAllUsers, selectLogedIn, selectLogedUser } from "../store/user/selectors";
import { performAllUsersSet } from "../store/user/slice";
import { deleteComment, deleteGallery, postComment } from "../service/GalleryService";

const Gallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const users = useSelector(selectAllUsers);
  const [urls, setUrls] = useState([]);
  const [commDescription, setComDescription] = useState("");
  const logedUser = useSelector(selectLogedUser);
  const logedIn = useSelector(selectLogedIn);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(performAllUsersSet());
    dispatch(performGallerySet(id));
    if (Object.keys(gallery).length !== 0) {
      setUrls(gallery.urls.split(","));
    } 
    document.title = gallery.name;
  }, [gallery]);

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  };

  const storeComment = () => {
    postComment(commDescription, logedUser.id, id);
    dispatch(performGallerySet(id));
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

  const deleteCom = (index) => {
    let deleteConfirm = window.confirm("Log out?");
    if(deleteConfirm) {
      deleteComment(index);
      dispatch(performGallerySet(id));
    }
  }

  const delGallery = () => {
    let deleteConfirm = window.confirm("Log out?");
    if(deleteConfirm) {
      deleteGallery(gallery.id);
      navigate('/');
    }
  }

  const setAuthorLink = () => {
    if(gallery.user) {
      return (
        <div style={{display: "flex", marginBottom: "10px"}}>
        <Link
          className="btn btn-secondary"
          style={{
            borderRadius: "15px",
            margin: "5px",
            padding: "8px",
          }}
          to={`/authors/${gallery.user.id}`}
        >
          Author: {`${gallery.user.first_name} ${gallery.user.last_name}`}
        </Link>
        {logedUser.id == gallery.user.id ? <div>
        <Link
        className="btn btn-success"
        style={{
          borderRadius: "15px",
          margin: "5px",
          padding: "8px",
        }}
        to={`/create/${gallery.id}`}
      >
        Edit
      </Link>
      
      <button
      onClick={delGallery}
      className="btn btn-danger"
      style={{
        borderRadius: "15px",
        margin: "5px",
        padding: "8px",
      }}
    >
      Delete
    </button> </div> : <></>}</div>
      )
    }
  }
  
  let checker = {display: "none"};

  if(logedIn) {
    checker = {display: "block"};
  }

  const setComments = () => {
    if (Object.keys(gallery).length !== 0) {
      return gallery.comments.map((comment, index) => {
        return (
          <div
            style={{
              border: "2px solid black",
              width: "60vw",
              padding: "8px",
              margin: "10px",
              borderRadius: "10px",
            }}
            key={index}
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
      {setAuthorLink()}
      <Carousel style={{ width: "60vw" }}>
        {urls.map((url, i) => {
          return (
            <Carousel.Item key={i}>
              <a href={url} target="_blank">
              <img
                style={{ borderRadius: "15px" }}
                className="d-block w-100"
                src={url}
                alt="slider image"
              /></a>
              <Carousel.Caption>
                <h3>{gallery.name}</h3>
                <p>{gallery.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div style={checker}>
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
      </div></div>
      {setComments()}
    </div>
  );
};

export default Gallery;
