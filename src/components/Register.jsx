const Register = () => {
  return(
    <div style={{display: 'flex', justifyContent: "center"}}>
      <form style={{width: "25vw"}}>
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <div className="form-floating">
          <input type="text" className="form-control" id="firstName" placeholder="First Name" required/>
          <label for="firstName">First Name</label>
        </div>
        <div className="form-floating mt-3">
          <input type="text" className="form-control" id="lastName" placeholder="Last Name" required/>
          <label for="lastName">Last Name</label>
        </div>
        <div className="form-floating mt-3">
          <input type="email" className="form-control" id="email" placeholder="name@example.com" required/>
          <label for="email">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input type="password" className="form-control" id="password" placeholder="Password" required/>
          <label for="password">Password</label>
        </div>
        <div className="form-floating mt-3">
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" required/>
          <label for="confirmPassword">Confirm Password</label>
        </div>
        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" required/>
          <label className="form-check-label" for="flexCheckDefault">
            I Accept Terms and Conditions
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; Zavrsni =)</p>
      </form>
    </div>
  );
};

export default Register;
