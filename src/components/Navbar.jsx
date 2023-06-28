import { useDispatch, useSelector } from "react-redux";
import { performLogedIn } from "../store/user/slice";
import { selectLogedIn } from "../store/user/selectors";

const Navbar = () => {
  const dispatch = useDispatch();
  const logedIn = useSelector(selectLogedIn);

  const logoutHandler = () => {
    dispatch(performLogedIn());
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid container d-flex flex-wrap justify-content-center">
        <a
          className="navbar-brand d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
          href="/"
        >
          All Galleries
        </a>
        <div className="nav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {!logedIn ? 
            <div style={{display: "flex"}}>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </div>
            :
            <li className="nav-item">
              <button onClick={logoutHandler} className="nav-link" style={{border: "1px solid white", borderRadius: "10px"}}>
                Log Out
              </button>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
