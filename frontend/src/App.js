import "./App.css";
import Landingpage from "./pages/Landingpage";
import Navbar from "./Navbar";
import Login from "./Auth/Login";
import { Routes, Route } from "react-router";
import Signup from "./Auth/SignUp";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
    
  );
}

export default App;
