import { useDispatch, useSelector } from "react-redux";
import { performLogedIn } from "../store/user/slice";
import { selectLogedIn, selectLogedUser } from "../store/user/selectors";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const logedIn = useSelector(selectLogedIn);
  const logedUser = useSelector(selectLogedUser);
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    const logOut = window.confirm("Log out?");
    if(logOut) {
      dispatch(performLogedIn());
      navigate('/');
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid container d-flex flex-wrap justify-content-center">
        <div className="d-flex align-items-center me-md-auto">
        <Link
          className="navbar-brand  mb-3 mb-md-0 text-decoration-none"
          to={"/"}
        >
          All Galleries
        </Link>
        {logedIn ? 
        <div style={{display: "flex"}}>
          <Link
            className="navbar-brand  mb-3 mb-md-0 text-decoration-none"
            to={`/my-galleries/${logedUser.id}`}
          >
            My Galleries
          </Link>
          <Link className="navbar-brand  mb-3 mb-md-0 text-decoration-none" to={"/create"}>
            Create New Gallery
          </Link>
        </div>
        : <></>}</div>
        <div className="nav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {logedIn ? <li className="nav-item nav-link" style={{marginRight: "20px"}}>{logedUser.first_name} {logedUser.last_name}</li> : <></>}
            {!logedIn ? 
            <div style={{display: "flex"}}>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
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
