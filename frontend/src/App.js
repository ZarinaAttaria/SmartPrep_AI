import "./App.css";
import Landingpage from "./pages/Landingpage";
import Navbar from "./Navbar";
import Login from "./Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Landingpage />
      <Login />
    </>
  );
}

export default App;
