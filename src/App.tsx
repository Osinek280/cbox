import "./App.css";
// import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>homepage</>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contact" element={<>fdsfsd</>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
