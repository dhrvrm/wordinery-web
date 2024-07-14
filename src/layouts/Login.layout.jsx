import { Button } from "@/components/ui/button";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		login();
		navigate("/app");
	};

	return (
		<div>
			<h1>Login Page</h1>
			<Button onClick={handleLogin}>Login</Button>
		</div>
	);
};

export default LoginPage;
