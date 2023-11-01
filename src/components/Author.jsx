import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectAuthor, selectLogedUser } from "../store/user/selectors";
import { useEffect } from "react";
import { performAuthorSet } from "../store/user/slice";
import { deleteGallery } from "../service/GalleryService";

const Author = () => {
  const dispatch = useDispatch();
  const author = useSelector(selectAuthor);
  const { id } = useParams();
  const logedUser = useSelector(selectLogedUser);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(performAuthorSet(id));
  }, [id]);

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  };
  
  const delGallery = (galleryId) => {
    deleteGallery(galleryId);
    dispatch(performAuthorSet(id));
    navigate(`/authors/${id}`);
  };
  
  let hide = {};
  
  if (Object.keys(author).length !== 0) {
    if (!author.user.gallery) {
      hide = { display: "content", fontWeight: "500", fontSize: "30px" };
    } else {
      hide = { display: "none" };
    }
  }
  
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div style={hide}></div>
      <div style={hide}>There are no galleries.</div>
      {author?.user?.gallery
        ?.map((gallery, index) => {
          return (
            <div key={index} className="col">
              <div className="card shadow-sm">
                <img
                  src={JSON.parse(gallery.urls)[0]}
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                />
                <div className="card-body">
                  <Link
                    to={`/authors/${author.id}`}
                    type="button"
                    className="btn btn-sm"
                  >
                    {author.first_name} {author.last_name}
                  </Link>
                  <p className="card-text">{gallery.name}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link
                        to={`/galleries/${gallery.id}`}
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        View
                      </Link>
                      {author.id === logedUser.id && (
                        <button
                          onClick={() => delGallery(gallery.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <small className="text-body-secondary">
                      {dateFunc(gallery.created_at)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default Author;
