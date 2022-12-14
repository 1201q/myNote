import ReactModal from "react-modal";
import styled from "styled-components";
import "./Modal.css";
import { authService } from "./firebase";
import { React, useEffect, useState, useRef } from "react";

const customStyles = {
  content: {
    width: "400px",
    height: "410px",
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

const SignUpModal = ({ isOpen, onCancel }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [forCheckPw, setForCheckPw] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isPwSame, setIsPwSame] = useState(false);
  const [stateMsg, setStateMsg] = useState("");

  const forCheckPwInputRef = useRef();

  useEffect(() => {
    setId("");
    setPw("");
    setForCheckPw("");
    setStateMsg("");
  }, [isOpen]);

  useEffect(() => {
    if (pw === "") {
      return;
    }

    if (forCheckPw.length < 4) {
      setStateMsg("");
      return;
    }

    if (pw === forCheckPw) {
      setIsPwSame(true);
      setStateMsg("??????????????? ?????????.");
    } else if (pw !== forCheckPw) {
      setIsPwSame(false);
      setStateMsg("??????????????? ?????????.");
    }
  }, [forCheckPw]);

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;

    if (name === "id") {
      setId(value);
    } else if (name === "pw") {
      setPw(value);
    } else if (name === "forCheckPw") {
      setForCheckPw(value);
    }
  };

  const onResiterUser = async (e) => {
    e.preventDefault();
    let userData;
    if (isPwSame) {
      try {
        userData = await authService.createUserWithEmailAndPassword(id, pw);
        setLoggedIn(true);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setStateMsg("????????? ??????????????????.");
        } else if (error.code === "auth/weak-password") {
          setStateMsg("??????????????? 6?????? ???????????? ??????????????????.");
        } else if (error.code === "auth/invalid-email") {
          setStateMsg("???????????? ?????? ??????????????????.");
        }
        setPw("");
        setForCheckPw("");
        console.log(error);
      }
    } else {
      setForCheckPw("");
      return;
    }
  };

  return (
    <div>
      <ReactModal isOpen={isOpen} style={customStyles}>
        <HeaderText>????????????</HeaderText>
        <SignUpForm onSubmit={onResiterUser}>
          <SignUpInput
            type="email"
            onChange={onChange}
            value={id}
            name="id"
            placeholder="?????????"
            required
          />
          <SignUpInput
            type="password"
            onChange={onChange}
            value={pw}
            name="pw"
            placeholder="????????????"
            required
          />
          <SignUpInput
            type="password"
            ref={forCheckPwInputRef}
            onChange={onChange}
            value={forCheckPw}
            name="forCheckPw"
            placeholder="??????????????? ?????? ???????????????."
            required
          />
          <SignUpBtn type="submit">????????????</SignUpBtn>
        </SignUpForm>
        <CenterDiv>
          <CancelBtn onClick={onCancel}>??????</CancelBtn>
        </CenterDiv>
        <p style={{ textAlign: "center" }}>{stateMsg}</p>
      </ReactModal>
    </div>
  );
};

export default SignUpModal;
