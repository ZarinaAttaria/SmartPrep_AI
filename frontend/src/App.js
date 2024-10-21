import "./App.css";
import Landingpage from "./pages/Landingpage";
import Navbar from "./Navbar";
import Login from "./Auth/Login";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
