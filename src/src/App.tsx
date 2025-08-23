import "./App.css";
// import { Navbar } from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    // <>
    //   <Navbar />
    // </>
    <div className="p-4">
      <nav className="mb-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<>fds</>} />
        <Route path="/about" element={<>dfsd</>} />
        <Route path="/contact" element={<>fdsfsd</>} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
