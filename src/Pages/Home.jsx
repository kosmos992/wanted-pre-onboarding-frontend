import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleToken = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleToken);

    return () => {
      window.removeEventListener("storage", handleToken);
    };
  });

  const navigate = useNavigate();

  const toSignUp = () => navigate("/signup");
  const toSignIn = () => navigate("/signin");
  const toTodo = () => navigate("/todo");

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <header>안녕하세요</header>
      <br />
      <button onClick={isLoggedIn ? toTodo : toSignIn}> 로그인 </button>
      <button onClick={isLoggedIn ? toTodo : toSignUp}> 회원가입 </button>
      <button onClick={isLoggedIn ? toTodo : toSignIn}> 투두리스트 </button>
      <br />
      {!!isLoggedIn ? <button onClick={logOut}>로그아웃</button> : null}
    </>
  );
};

export default Home;
