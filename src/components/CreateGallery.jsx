import { useDispatch, useSelector } from "react-redux";
import { selectLogedUser } from "../store/user/selectors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { performGallerySet } from "../store/gallery/slice";
import { selectGallery } from "../store/gallery/selectors";
import { postGallery, updateGallery } from "../service/GalleryService";

const CreateGallery = () => {
  const selectedGallery = useSelector(selectGallery);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logedUser = useSelector(selectLogedUser);
  const [gallery, setGallery] = useState({
    name: "",
    description: "",
    urls: "",
    user_id: logedUser.id
  });
  const [urls, setUrls] = useState([""]);
  const { id } = useParams();

  useEffect(() => {
    if(id && Object.keys(selectedGallery).length === 0) {
      dispatch(performGallerySet(id));
    };

    if(Object.keys(gallery).length !== 0 && id) {
      setGallery(selectedGallery);
      setUrls(selectedGallery.urls.split(","));
    }
  }, [selectedGallery]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(gallery.urls.length === 0) {
      return alert("Please enter at least one image URL.");
    }

    const urlValidationRegex = /^(http|https):\/\/[^ "]+$/;

    for(const url of gallery.urls.split(',')) {
      if (!urlValidationRegex.test(url)) {
        alert("Please enter a valid link.");
        return;
      }

      if (!url.includes("png") && !url.includes("jpg") && !url.includes("jpeg")){
        alert("Your links have to include one of the following extensions: JPG, PNG or JPEG");
        return;
      }
    }
    
    if(id) {
      updateGallery(gallery, id);
      navigate(`/authors/${logedUser.id}`);
    }else {
      postGallery(gallery);
      navigate(`/authors/${logedUser.id}`);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGallery((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const handleUrl = (e, urlId) => {
    let arrHelper = urls;
    arrHelper[urlId] = e.target.value;
    setUrls(arrHelper);

    setGallery((prevState) => {
      return {...prevState, urls: urls.filter((url) => url.length != 0).join(",")}
    })
  }

  const addUrl = (e) => {
    e.preventDefault();
    setUrls((prevState) => [...prevState, ""]);
    console.log(urls);
  }

  const removeUrl = (e, index) => {
    e.preventDefault();
    setUrls((urls) => urls.filter((url, id) => id != index));
    console.log(urls);
  }

  return (
    <div style={{display: 'flex', justifyContent: "center"}}>
      <form onSubmit={(e) => handleSubmit(e)} style={{width: "35vw", backgroundColor: "lightgray", padding: "30px", borderRadius: "20px"}}>
        <h1 className="h3 mb-3 fw-normal">Create Gallery:</h1>
        <div className="form-floating">
          <input name="name" onChange={handleInputChange} value={gallery.name} type="text" className="form-control" id="name" placeholder="Gallery Name" minLength="2" maxLength="255" required/>
          <label for="name">Gallery Name</label>
        </div>
        <div className="form-floating mt-3">
          <textarea name="description" style={{height: "100px"}} onChange={handleInputChange} value={gallery.description} type="text" className="form-control" id="description" placeholder="description"  maxLength="1000"/>
          <label for="description">Description</label>
        </div>
        {urls.map((url, id) => {
          return (
            <div key={id} style={{marginTop: "10px"}}>
              <input name="urls" onChange={(e) => handleUrl(e, id)} value={url} type="text" className="form-control" id="name" placeholder="Url" />
              {id != 0 ? <button onClick={(e) => removeUrl(e, id)} style={{marginTop: "10px"}} className="btn btn-danger">Remove</button> : <></>}
            </div>
          )
        })}
        <button onClick={addUrl} style={{marginTop: "10px"}} className="btn btn-secondary">Add url</button>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">{id ? "Edit" : "Submit"}</button><Link to={`/authors/${logedUser.id}`} className="btn btn-primary w-100 py-2 mt-3">Cancel</Link>
        <p className="mt-3 mb-3 text-body-secondary">&copy; Zavrsni =)</p>
      </form>
    </div>
  );
}

export default CreateGallery;