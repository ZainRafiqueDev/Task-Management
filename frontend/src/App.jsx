import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import SignupPage from "./pages/signup.jsx";
import ForgotPassword from "./pages/forgot-password.jsx";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />

          {/* Later add Signup, Dashboard, Kanban */}
           {/* Signup route */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
