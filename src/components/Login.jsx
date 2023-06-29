import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performUserSet } from "../store/user/slice";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Login';
  });

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(performUserSet(user));
  }

  return (
    <div style={{display: 'flex', justifyContent: "center"}}>
      <form onSubmit={(e) => handleSubmit(e)} style={{width: "35vw", backgroundColor: "lightgray", padding: "30px", borderRadius: "20px"}}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input name="email" onChange={handelInputChange} value={user.email} type="email" className="form-control" id="email" placeholder="name@example.com" />
          <label for="email">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input name="password" onChange={handelInputChange} value={user.password} type="password" className="form-control" id="password" placeholder="Password" />
          <label for="password">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Log in</button>
        <p className="mt-3 mb-3 text-body-secondary">&copy; Zavrsni =)</p>
      </form>
    </div>
  );
};

export default Login;
