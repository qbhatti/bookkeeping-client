import React from "react";
import { Switch, Route } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
//pages
import HomePage from "./components/home/HomePage";
import SignupPage from "./components/signup/SignupPage";
//styles
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Provider>
  );
}

export default App;
