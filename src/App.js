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

function App() {
  const dispatch = useDispatch();

  async function checkUser() {
    const token = localStorage.getItem("access_token");
    if(token) {
      const { data } = await API.post("/refresh");
        localStorage.setItem("access_token", data.authorization.token);
        dispatch(performUserSet(data));
        console.log(token);
    }
  }

  // checkUser();

  return (
    <div className="container" style={{ marginTop: "80px" }}>
        <Routes>
          <Route index path="/" element={<AllGalleries />}></Route>
          <Route path='/galleries/:id' element={<Gallery />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
    </div>
  );
}

export default App;
