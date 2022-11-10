import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { authService } from "./firebase";
import Auth from "./Auth";
import Home from "./Home";
import Test from "./Test";
import "./reset.css";
import "./index.css";

function App() {
  const [isLoggedInUser, setIsLoggedInUser] = useState(false); // true일 경우 로그인 상태
  const [userData, setUserData] = useState(null);
  const [isDoneLoading, setIsDoneLoading] = useState(false); // true일 경우 로딩끝남

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedInUser(true);
        setUserData(user.uid);
      } else {
        setIsLoggedInUser(false);
      }
      setIsDoneLoading(true);
    });
  }, []);

  return (
    <Router>
      <Switch>
        {isDoneLoading ? (
          <>
            <Route exact path="/">
              {isLoggedInUser ? <Home userData={userData} /> : <Auth />}
            </Route>
            <Route exact path="/test">
              <Test />
            </Route>
          </>
        ) : (
          "Loading..."
        )}
      </Switch>
    </Router>
  );
}

export default App;
