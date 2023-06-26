const Login = () => {
  return (
    <div style={{display: 'flex', justifyContent: "center"}}>
      <form style={{width: "35vw", backgroundColor: "lightgray", padding: "30px", borderRadius: "20px"}}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating mt-3">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Log in</button>
        <p className="mt-3 mb-3 text-body-secondary">&copy; Zavrsni =)</p>
      </form>
    </div>
  );
};

export default Login;
