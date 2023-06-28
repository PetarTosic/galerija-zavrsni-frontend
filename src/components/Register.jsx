import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { performRegister } from "../store/user/slice";
import { selectLogedIn, selectLogedUser } from "../store/user/selectors";

const Register = () => {
  const logedIn = useSelector(selectLogedIn);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(performRegister(user));

    setUser({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };


  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "35vw",
          backgroundColor: "lightgray",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="first_name"
            onChange={handelInputChange}
            value={user.first_name}
            placeholder="First Name"
            required
          />
          <label for="firstName">First Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="last_name"
            onChange={handelInputChange}
            value={user.last_name}
            placeholder="Last Name"
            required
          />
          <label for="lastName">Last Name</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handelInputChange}
            value={user.email}
            placeholder="name@example.com"
            required
          />
          <label for="email">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handelInputChange}
            value={user.password}
            placeholder="Password"
            pattern="(?=.*\d).{8,}"
            required
          />
          <label for="password">Password</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="password_confirmation"
            onChange={handelInputChange}
            value={user.password_confirmation}
            placeholder="Confirm Password"
            pattern="(?=.*\d).{8,}"
            required
          />
          <label for="confirmPassword">Confirm Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
            required
          />
          <label className="form-check-label" for="flexCheckDefault">
            I Accept Terms and Conditions
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Register
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; Zavrsni =)</p>
      </form>
    </div>
  );
};

export default Register;
