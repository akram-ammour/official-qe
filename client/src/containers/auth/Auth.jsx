import React, { useEffect, useState } from "react";
import "./auth.css";
import gooogle from "../../assets/google.svg";
import { Custominput, Customselect, Custompassword } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/authSlice";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const Auth = ({ signin = false }) => {
  const {setAuth,auth} = useAuth()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard"
  const authDict = signin
    ? { value: "Sign in", link: "/signin" }
    : { value: "Sign up", link: "/signin" };
  const authOpposite = !signin
    ? { value: "Sign in", link: "/signin" }
    : { value: "Sign up", link: "/signin" };

  const [signinInputs, setSigninInputs] = useState({
    Email: "",
    Password: "",
  });
  const [signupInputs, setSignupInputs] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    Plan: "",
  });
  
  useEffect(()=>{
    const getUserInfos = async() =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/auth`)
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.Role;
            setAuth({ Email:signinInputs.Email, Role:role, accessToken });
            navigate("/dashboard")
        }
        catch (error){
            console.log("this is an errror",error)
        }
    }
    getUserInfos()
},[])
  // useEffect(()=>{
  //   try{

  //   }
  //   catch{

  //   }
  //   axios.get("/auth/user")
  //   .then(res =>{

  //       if (res.data.status == "success") {
  //           toast.success("logged in successfully");
  //           dispatch(loginSuccess(res.data.infos));
  //           navigate("/dashboard")
  //       }
  //       else{
  //           dispatch(loginFailure(res.data.error));
  //       }
  //   })
  //   .catch(err => console.log(err))
  // },[])





  const handleAuth = async () => {
    dispatch(loginStart());
    if (signin) {
        const {Email, Password} =signinInputs;
      // Validate form fields
      if ( !Email || !Password ) {
        toast.error("Please fill in all fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        toast.error("Invalid email format");
        return;
      }
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, signinInputs)
        
        toast.success("logged in successfully");
        dispatch(loginSuccess(response.data.infos));
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.Role;
        setAuth({ Email:signinInputs.Email, Role:role, accessToken });
        // navigate("/dashboard")
        navigate(from,{replace:true})
      
      } catch (err) {
        if (!err?.response) {
          toast.error('No Server Response');
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data.message);
      } else if (err.response?.status === 401) {
          toast.error(err.response?.data.message);
        } else {
          toast.error("login failed");
      }
        dispatch(loginFailure(err?.response?.data?.error));

      }
    }
 
    else {
      const { Fname, Lname, Email, Password, confirmPassword, Plan } =
        signupInputs;

      // Validate form fields
      if (
        !Fname ||
        !Lname ||
        !Email ||
        !Password ||
        !confirmPassword ||
        !Plan
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) {
        toast.error("Invalid email format");
        return;
      }



      // Check if password and confirm password match
      if (Password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        axios
          .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/register`, signupInputs)
          .then((res) =>{
            navigate("/signin")
          })
          .catch((err) => {
            console.log(err)
            if (err?.response?.status === 409){
              toast.error(err?.response?.data?.message);
            }
            else if (err.response && err.response.status >= 400 && err.response.status < 500) {
              toast.error("An unexpected error occurred!");
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="app__auth section__padding">
      <div className="app__auth-container">
        <h1>{authDict.value}</h1>
        {/* <a className="app__auth-container_google" href="#">
          <img src={gooogle} />
          <p>{signin ? "Sign in" : "login"} with google</p>
        </a>
        <div className="app__auth-container_separator">
          <div className="app__auth-line" />
          <p>or</p>
          <div className="app__auth-line" />
        </div> */}
        {signin ? (
          <div className="app__auth-container_form">
            <p>Enter your details to sign in to your e-qe account : </p>
            <Custominput
              title={"Email"}
              value={signinInputs.Email}
              onChange={(e) =>
                setSigninInputs({ ...signinInputs, Email: e.target.value })
              }
            />
            <Custompassword
              title={"Password"}
              value={signinInputs.Password}
              onChange={(value) =>
                setSigninInputs({ ...signinInputs, Password: value })
              }
            />
          </div>
        ) : (
          <div className="app__auth-container_form">
            <p>Enter your details to create your e-qe account :</p>
            <div className="app__auth-container_form-name">
              <Custominput
                title={"first-name"}
                value={signupInputs.Fname}
                onChange={(e) =>
                  setSignupInputs({ ...signupInputs, Fname: e.target.value })
                }
              />
              <Custominput
                title={"last-name"}
                value={signupInputs.Lname}
                onChange={(e) =>
                  setSignupInputs({ ...signupInputs, Lname: e.target.value })
                }
              />
            </div>
            <Custominput
              title={"Email"}
              value={signupInputs.Email}
              onChange={(e) =>
                setSignupInputs({ ...signupInputs, Email: e.target.value })
              }
            />
            <Custompassword
              title={"Password"}
              value={signupInputs.Password}
              onChange={(value) =>
                setSignupInputs({ ...signupInputs, Password: value })
              }
            />
            <Custompassword
              title={"Confirm Password"}
              value={signupInputs.confirmPassword}
              onChange={(value) =>
                setSignupInputs({ ...signupInputs, confirmPassword: value })
              }
            />
            <Customselect
              value={signupInputs.Plan}
              onChange={(e) =>
                setSignupInputs({ ...signupInputs, Plan: e.target.value })
              }
            />
          </div>
        )}

        <button className="app__auth-container_button" onClick={handleAuth}>
          {authDict.value}
        </button>

        <div className="app__auth-container_changeauth">
          {signin ? "No Account Contact Us ?" : "Already registered ?"}{" "}
        </div>
        <div className="app__auth-container_needhelp">
          {signin ? <p>Forgot password ?</p> : <p>Need help ?</p>}
          <div className="app__auth-container_needhelp-hover">
            <p>
              if you need help with logging in contact us at{" "}
              <span>212+ 656571884</span>, and we will try our best to help you
              fix your issue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
