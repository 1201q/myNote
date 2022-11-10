import styled from "styled-components";
import { authService, firebaseInstance } from "./firebase";
import React, { useState } from "react";
import SignUpModal from "./SignUpModal";
import { ReactComponent as Google } from "./assets/Google__G__Logo.svg";
import PasswordResetModal from "./PasswordResetModal";

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 430px;
  background-color: white;
  border-radius: 10px;
  border: 1.5px solid #cccccc;
`;

const RealDiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  width: 450px;
  height: 250px;
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: 40px;
  text-align: center;
  font-weight: 900;
  margin-bottom: 20px;
`;

const LoginInput = styled.input`
  width: 90%;
  height: 50px;
  border: none;
  padding: 0;
  border-bottom: 1.5px solid gray;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 500;
  outline: none;
`;

const LoginBtn = styled.button`
  width: 91%;
  height: 45px;
  margin-top: 10px;
  background-color: #fc7575;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 800;
  color: white;
  cursor: pointer;
`;

const SignUpBtn = styled.button`
  width: 20%;
  font-size: 20px;
  font-weight: 400;
  color: gray;
  cursor: pointer;
`;

const PasswordResetBtn = styled.button`
  width: 35%;
  font-size: 20px;
  font-weight: 400;
  color: gray;
  cursor: pointer;
`;

const Auth = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [stateMsg, setStateMsg] = useState("");

  const onLoginUser = async (e) => {
    e.preventDefault();
    let userData;
    try {
      userData = (await authService.signInWithEmailAndPassword(id, pw)).user;
      setLoggedIn(true);
      console.log(userData.uid);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setStateMsg("비밀번호가 틀렸어요.");
      } else if (error.code === "auth/user-not-found") {
        setStateMsg("존재하지 않는 유저에요. 이메일을 다시 확인해보세요.");
      } else if (error.code === "auth/user-disabled") {
        setStateMsg("비활성화된 계정이에요. 관리자에게 문의해보세요.");
      } else {
        setStateMsg("현재 로그인할 수 없어요.");
      }

      setPw("");

      console.log(error);
    }
  };

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;

    if (name === "id") {
      setId(value);
    } else if (name === "pw") {
      setPw(value);
    }
  };

  const onModal = () => {
    setModalIsOpen(true);
  };

  const onResetModal = () => {
    setResetModalOpen(true);
  };

  const onCancel = () => {
    setModalIsOpen(false);
    setResetModalOpen(false);
  };

  const onGoogleLogin = async () => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <CenterDiv>
      <LoginDiv>
        <LoginForm onSubmit={onLoginUser}>
          <HeaderText>로그인</HeaderText>
          <LoginInput
            type="email"
            onChange={onChange}
            value={id}
            name="id"
            placeholder="이메일"
            required
          />
          <LoginInput
            type="password"
            onChange={onChange}
            value={pw}
            name="pw"
            placeholder="비밀번호"
            required
          />
          <LoginBtn type="submit">로그인</LoginBtn>
        </LoginForm>

        <SignUpModal isOpen={isModalOpen} onCancel={onCancel} />
        <RealDiv>
          <Google
            onClick={onGoogleLogin}
            style={{ cursor: "pointer" }}
          ></Google>
          <p
            style={{
              fontSize: "22px",
              color: "gray",
              marginLeft: "20px",
              marginRight: "15px",
            }}
          >
            |
          </p>
          <SignUpBtn onClick={onModal}>회원가입</SignUpBtn>
          <PasswordResetBtn onClick={onResetModal}>
            비밀번호 찾기
          </PasswordResetBtn>
          <PasswordResetModal isOpen={isResetModalOpen} onCancel={onCancel} />
        </RealDiv>
        <div style={{ height: "30px" }}>
          <p style={{ textAlign: "center" }}>{stateMsg}</p>
        </div>
      </LoginDiv>
    </CenterDiv>
  );
};

export default Auth;
