import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
