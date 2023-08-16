import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { SIGNIN_URL } from "../constants";

const SignIn = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleMouseIn = () => {
    setShowPw(true);
  };
  const handleMouseOut = () => {
    setShowPw(false);
  };

  const navigate = useNavigate();
  const toSignUp = () => navigate("/signup");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(SIGNIN_URL, { email, password: pw });
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      setLoggedIn(true);
      toast.success("로그인 완료! 투두리스트로 이동합니다.");
    } catch (error) {
      toast.error("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <header>로그인하기</header>
      <br />
      <section>
        <input
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
        />
      </section>
      <br />
      <section>
        <input
          data-testid="password-input"
          value={pw}
          type={showPw ? "text" : "password"}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
        <br />{" "}
        <span
          role="button"
          onMouseDown={handleMouseIn}
          onMouseUp={handleMouseOut}
          onMouseLeave={handleMouseOut}
          style={{ cursor: "pointer" }}
        >
          👁️
        </span>
      </section>
      <br />
      <button data-testid="signin-button" onClick={submit}>
        로그인
      </button>
      <button onClick={toSignUp}> 회원가입 </button>
    </>
  );
};

export default SignIn;
