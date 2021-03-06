import React from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/Theme";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//pages
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import AccountDetailsPage from "./pages/account/AccountDetailsPage";
//components
import AuthRoute from "./components/utils/AuthRoute";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Navbar from "./components/ui/Navbar";
//styles
import "./App.css";

axios.defaults.baseURL =
  "https://us-central1-accounting-urm.cloudfunctions.net/api";

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navbar>
          <Switch>
            {/*
        AuthRoute: redirects to users home page if user is already authenticated, else renders the component
        ProtectedRoute: redirects to login page if user tries to access a protected url
        Route: behaves normally        
        */}
            <AuthRoute exact path="/signup" component={SignupPage} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <AuthRoute exact path="/login" component={LoginPage} />
            <ProtectedRoute
              exact
              path="/account"
              component={AccountDetailsPage}
            />
          </Switch>
        </Navbar>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
