import React from "react";
import { Switch, Route } from "react-router-dom";
//pages
import HomePage from "./components/home/HomePage";
import SignupPage from "./components/signup/SignupPage";
//styles
import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
