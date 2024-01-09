import React from "react";
import "./App.css";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/login/Login";
import { routeGuard } from "./components/service/authservice/Route-Guard";


const App: React.FC = () => {
  const isAuthenticated = routeGuard()
 

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/" element={isAuthenticated? <Home/>:<Navigate to='/login' />}></Route>      
          <Route path="/home" element={isAuthenticated? <Home/>:<Navigate to='/login' />}></Route>      
        </Routes>
      </Router>
    </div>
  );
};

export default App;
