import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";

import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Todo from "./Pages/Todo";

import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = false;

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setLoggedIn(!!localStorage.getItem("token"));
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/todo" replace={true} /> : <SignUp />
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/todo" replace={true} />
              ) : (
                <SignIn setLoggedIn={setLoggedIn} />
              )
            }
          />
          <Route
            path="/todo"
            element={
              isLoggedIn ? <Todo /> : <Navigate to="/signin" replace={true} />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
