import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllGalleries from "./components/AllGalleries";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <Routes>
        <Route index path="/" element={<AllGalleries />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
