import ReactModal from "react-modal";
import styled from "styled-components";
import "./Modal.css";
import { authService } from "./firebase";
import { React, useEffect, useState, useRef } from "react";

const customStyles = {
  content: {
    width: "400px",
    height: "350px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(40, 40, 40, 0.8)",
  },
};

const SignUpInput = styled.input`
  padding: 0;
  width: 90%;
  height: 50px;
  border: none;
  border-bottom: 1.5px solid gray;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 500;
  outline: none;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.p`
  font-size: 40px;
  text-align: center;
  font-weight: 900;
  margin: 20px 0px;
`;

const Sibal = styled.div`
  padding: 0px 20px;
  line-height: 20px;
  margin-bottom: 20px;
`;

const SignUpBtn = styled.button`
  width: 91%;
  height: 45px;
  margin: 10px 0px 10px 0px;
  background-color: #fc7575;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 800;
  color: white;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  width: 91%;
  height: 45px;
  background-color: #cccccc;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 30px;
  color: white;
  cursor: pointer;
`;

const CenterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PasswordResetModal = ({ isOpen, onCancel }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail("");
  }, [isOpen]);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };

  const onSendMsg = async (e) => {
    e.preventDefault();
    let sendOrNotsend = window.confirm(
      `${email}으로 비밀번호 재설정 링크를 보냅니다.`
    );
    if (sendOrNotsend) {
      await authService.sendPasswordResetEmail(email);
    } else {
      return;
    }
    setEmail("");
  };

  return (
    <div>
      <ReactModal isOpen={isOpen} style={customStyles}>
        <HeaderText>비밀번호 재설정</HeaderText>
        <Sibal>
          만약 비밀번호를 분실하셨다면, 이메일 인증을 통해 비밀번호를
          재설정해보세요.
        </Sibal>
        <SignUpForm onSubmit={onSendMsg}>
          <SignUpInput
            type="email"
            onChange={onChange}
            value={email}
            placeholder="이메일"
            required
          />
          <SignUpBtn type="submit">비밀번호 재설정</SignUpBtn>
        </SignUpForm>
        <CenterDiv>
          <CancelBtn onClick={onCancel}>취소</CancelBtn>
        </CenterDiv>
      </ReactModal>
    </div>
  );
};

export default PasswordResetModal;
