import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import FilesPage from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <FilesPage />
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
