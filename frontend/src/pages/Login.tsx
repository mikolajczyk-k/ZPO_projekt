import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiLogin(email, password);
      if (response.success && response.clientId !== null) {
        login(response.clientId);
        navigate("/dashboard");
      } else {
        // handle login error
        console.error("Login failed");
      }
    } catch (error) {
      // handle login error
      console.error("Login error", error);
    }
  };

  const apiLogin = async (email: string, password: string) => {
    const response = await axios.get(
      `http://localhost:8080/clients/auth/${email}/${password}`
    );
    return response.data; // Assuming the response structure is { success: boolean, clientId: number }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
