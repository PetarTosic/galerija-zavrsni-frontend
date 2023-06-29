import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { performGallerySet } from "../store/gallery/slice";
import { selectGallery } from "../store/gallery/selectors";
import Carousel from 'react-bootstrap/Carousel';

const Gallery = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectGallery);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if(!gallery){
      dispatch(performGallerySet(id));
    }else {
      setUrls(gallery.urls.split(','));
    }
    document.title = gallery.name;
  }, [gallery]);

  return (<div style={{display: 'flex', justifyContent: 'center'}}>
      <Carousel style={{width: '60vw'}}>
        {urls.map((url, i) => {
          return (
            <Carousel.Item>        
          <img
            className="d-block w-100"
            src={url}
            alt="slider image"
          />
          <Carousel.Caption>
            <h3>{gallery.name}</h3>
            <p>{gallery.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  );
}

export default Gallery;