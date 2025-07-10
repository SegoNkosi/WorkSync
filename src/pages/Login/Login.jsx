import React, { useContext, useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { signup, login } from '../../config/firebase';
import { AppContext } from '../../context/AppContext'; 
import { toast } from 'react-toastify'; 

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loadUserData } = useContext(AppContext); 

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "Sign Up") {
      const res = await signup(userName, email, password);
      if (res) {
        toast.success("Account created successfully! Please log in.");
        setCurrState("Login"); 
        setUserName("");
        setEmail("");
        setPassword("");
      }
    } else {
      const res = await login(email, password);
      if (res?.user) {
        await loadUserData(res.user.uid); 
      }
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>

        {currState === "Sign Up" && (
          <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder='Username' className="form-input" required />
        )}

        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email Address' className="form-input" required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className="form-input" required />

        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login now"}</button>

        {currState === "Sign Up" && (
          <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          ) : (
            <p className="login-toggle">Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
