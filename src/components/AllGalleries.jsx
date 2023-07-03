import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performGalleriesSet } from "../store/gallery/slice";
import { selectAllGalleries, selectLastPage } from "../store/gallery/selectors";
import { Link } from "react-router-dom";

const AllGalleries = () => {
  const dispatch = useDispatch();
  const galleriesHelper = useSelector(selectAllGalleries);
  let [search, setSearch] = useState({search: ''});
  const lastPage = useSelector(selectLastPage);
  let [curPage, setCurPage] = useState();
  let [galleries, setGalleries] = useState(galleriesHelper);

  useEffect(() => {
    dispatch(performGalleriesSet({page: curPage}));
    document.title = 'Home';
    setCurPage(1);
  }, []);
  
  useEffect(() => {
    if(galleries.length) {
      if(galleriesHelper[0].id != galleries[0].id) {
        setGalleries([...galleries, ...galleriesHelper]);
      }
    }else {
      setGalleries(galleriesHelper);
    }
  }, [galleriesHelper])
  let hide = {display: 'none'};

  const loadMore = () => {
    setCurPage(curPage = curPage + 1);
    dispatch(performGalleriesSet({page: curPage}));
  }
  
  if(!galleries.length) {
    hide = {display: 'content', fontWeight: '500', fontSize: '30px'};
  }

  const dateFunc = (date) => {
    return new Date(date).toLocaleString();
  }

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearch((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  
  const filterResults = (event) => {
    
  }
  
  return (
  <div style={{marginBottom: "100px"}}>
    <form
        onSubmit={(e) => filterResults(e)}
        style={{display: "flex", justifyContent: "center", marginBottom: "15px"}}
      >
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            onChange={handleSearchChange}
            value={search.search}
            placeholder="Search"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit" style={{marginLeft: "10px"}}>
          Search
        </button>
      </form>
  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <div style={hide}></div><div style={hide}>There are no galleries.</div>
    {galleries?.map((gallery, index) => {
      return (
      <div key={index} className="col">
        <div className="card shadow-sm">
          <img src={gallery.urls.split(',')[0]} className="bd-placeholder-img card-img-top" width="100%" height="225"/>
          <div className="card-body"><>Author:</>
            <Link to={`/authors/${gallery.user.id}`} type="button" className="btn btn-sm btn-outline-primary" style={{marginLeft: "5px", marginBottom: "8px"}}>{gallery.user.first_name} {gallery.user.last_name}</Link>
            <br/>Gallery Name:
            <Link to={`/galleries/${gallery.id}`} type="button" className="btn btn-sm btn-outline-secondary" style={{marginLeft: "5px"}}>{gallery.name}</Link>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
              </div>
              <small className="text-body-secondary">{dateFunc(gallery.created_at)}</small>
            </div>
          </div>
        </div>
      </div>
      )
    })}
    {curPage < lastPage ? 
      <button onClick={loadMore} className="btn">Load More</button> : <></>}
    </div>
    </div>
  );
};

export default AllGalleries;
