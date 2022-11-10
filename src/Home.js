import React from "react";
import { authService } from "./firebase";
import axios from "axios";

const Home = ({ userData }) => {
  return (
    <div>
      나의 식별 ID: {userData}
      <button
        onClick={() => {
          authService.signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Home;
