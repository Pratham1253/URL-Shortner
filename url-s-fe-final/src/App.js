import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import Dashboard from "./dashboard/Dashboard";
import "./styles.css";
import { decode_jwt } from "./slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/"; // redirect to login page
    return null;
  }

  const decoded = decode_jwt(accessToken);
  const expDate = new Date(decoded.exp * 1000);
  const now = new Date();
  if (now > expDate) {
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // redirect to login page
    return null;
  }

  return children;
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
