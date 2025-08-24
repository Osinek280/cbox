import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <h1>Siema ziomek, jesteś zalogowany (context działa)</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <>Kontakt — tylko dla zalogowanych gyatów</>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 — weź spierdziel</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
