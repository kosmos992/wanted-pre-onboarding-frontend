import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { SIGNUP_URL } from "../constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const emailReg = /@/;
  const pwReg = /^.{8,}$/;

  const emailIsValid = emailReg.test(email);
  const pwIsValid = pwReg.test(pw);

  const isValid = emailIsValid && pwIsValid;

  const handleMouseIn = () => {
    setShowPw(true);
  };
  const handleMouseOut = () => {
    setShowPw(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(SIGNUP_URL, { email, password: pw });
      toast.success("회원가입 완료! 로그인으로 이동합니다.");
      navigate("/signin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <header>회원가입하기</header>
      <br />
      <section>
        <input
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
        />
        <span style={{ color: "lightgray" }}>
          &nbsp;{!emailIsValid ? " 이메일은 @를 포함해야 합니다" : "✅"}
        </span>
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
        <span style={{ color: "lightgray" }}>
          &nbsp;{!pwIsValid ? " 비밀번호는 8자 이상이어야 합니다" : "✅"}
        </span>
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
      <button data-testid="signup-button" disabled={!isValid} onClick={submit}>
        회원가입
      </button>
    </>
  );
};

export default SignUp;
