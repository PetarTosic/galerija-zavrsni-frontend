import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performGalleriesSet } from "../store/gallery/slice";
import { selectAllGalleries } from "../store/gallery/selectors";
import { Link } from "react-router-dom";

const AllGalleries = () => {
  const dispatch = useDispatch();
  const galleries = useSelector(selectAllGalleries);

  useEffect(() => {
    dispatch(performGalleriesSet());
    document.title = 'Home';
  }, []);

  let hide = {display: 'none'};
  
  if(!galleries.length) {
    hide = {display: 'content', fontWeight: '500', fontSize: '30px'};
  }

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  }
  
  return (
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div style={hide}></div><div style={hide}>There are no galleries.</div>
    {galleries.map((gallery) => {
      return (
      <div class="col">
        <div class="card shadow-sm">
          <img src={gallery.urls} class="bd-placeholder-img card-img-top" width="100%" height="225"/>
          <div class="card-body">
            <Link type="button" class="btn btn-sm">{gallery.user.first_name} {gallery.user.last_name}</Link>
            <p class="card-text">{gallery.name}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <Link to={`/galleries/${gallery.id}`} type="button" class="btn btn-sm btn-outline-secondary">View</Link>
              </div>
              <small class="text-body-secondary">{dateFunc(gallery.created_at)}</small>
            </div>
          </div>
        </div>
      </div>
      )
    })}
    </div>
  );
};

export default AllGalleries;
