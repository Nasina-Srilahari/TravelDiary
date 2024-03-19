import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import login_image from "./login_image.png";
import image2 from "./image2.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="login">
      <div className="lContainer1">
      <img src={image2} style={{ width: "400px", height: "400px" }} />
      </div>
      <div className="lContainer2">
      <h1 className="login-heading">Login</h1>
      <center>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        </center>
        <br />
        {/* {error && <span style={{ color: "red", textAlign: "center", marginTop: "5px", display: "block !important" }}>{error.message}</span>} */}
      </div>
      {/* <div className="login-parts">
        <div className="image-login">
          <img className="image-l" src={image2}/>
        </div>
        <div className='login'>
          <div className="wrapper">
            <form onSubmit={handleClick}>
              <h1>Login</h1>
              <div className="input-box">
                <input type="text" placeholder="Email" required onChange={handleChange}/>
                <i className='bx bxs-user'></i>
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required onChange={handleChange}/>
                <i className='bx bxs-lock-alt' ></i>
              </div>
              {/* <div className="remember-forgot">
                <label><input type="checkbox"/>Remember Me </label>
                <a href="a">ForgotPassword</a>
              </div> */}
              {/* <button type="submit" className="btn">Login</button>
              <div className="register-link">
                <p>Don't have an account? <a onClick={(e) => {navigate("/register")}} >Register</a></p>
              </div>
            </form>
              
            </div>
        </div>
      </div> */}

    </div>
  );
};

export default Login;
