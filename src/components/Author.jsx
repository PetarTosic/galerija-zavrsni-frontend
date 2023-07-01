import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { selectAuthor } from "../store/user/selectors";
import { useEffect } from "react";
import { performAuthorSet } from "../store/user/slice";

const Author = () => {
  const dispatch = useDispatch();
  const author = useSelector(selectAuthor);
  const { id } = useParams();
  
  useEffect(() => {
    dispatch(performAuthorSet(id));
  },[]);

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  }

  console.log(author.galleries);

  let hide = {display: 'none'};
  
  if(!author.galleries.length) {
    hide = {display: 'content', fontWeight: '500', fontSize: '30px'};
  }

  return(
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div style={hide}></div><div style={hide}>There are no galleries.</div>
    {author.galleries.map((gallery, index) => {
      return (
      <div key={index} className="col">
        <div className="card shadow-sm">
          <img src={gallery.urls.split(',')[0]} className="bd-placeholder-img card-img-top" width="100%" height="225"/>
          <div className="card-body">
            <Link to={`/authors/${author.id}`} type="button" className="btn btn-sm">{author.first_name} {author.last_name}</Link>
            <p className="card-text">{gallery.name}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link to={`/galleries/${gallery.id}`} type="button" className="btn btn-sm btn-outline-secondary">View</Link>
              </div>
              <small className="text-body-secondary">{dateFunc(gallery.created_at)}</small>
            </div>
          </div>
        </div>
      </div>
      )
    })}
    </div>
  );
}

export default Author;