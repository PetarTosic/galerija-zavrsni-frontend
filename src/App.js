import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllGalleries from "./components/AllGalleries";
import Login from "./components/Login";
import Register from "./components/Register";
import Gallery from "./components/Gallery";
import { API } from "./shared/api";
import { useDispatch } from "react-redux";
import { performUserSet } from "./store/user/slice";
import Author from "./components/Author";
import { useEffect } from "react";
import CreateGallery from "./components/CreateGallery";
import ProtectedRoute from "./shared/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  useEffect(() => {
    if(email && password) {
      dispatch(performUserSet({email: email, password: password}))
    }
  },[]);

  return (
    <div className="container" style={{ marginTop: "80px" }}>
        <Routes>
          <Route index path="/" element={<AllGalleries />}></Route>
          <Route path='/galleries/:id' element={<Gallery />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/authors/:id" element={<Author />}></Route>
          <Route path="/my-galleries/:id" element={<Author />}></Route>
          <Route path="/create" element={<ProtectedRoute><CreateGallery /></ProtectedRoute>}></Route>
          <Route path="/create/:id" element={<ProtectedRoute><CreateGallery /></ProtectedRoute>}></Route>
        </Routes>
    </div>
  );
}

export default App;
