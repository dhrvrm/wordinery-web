import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		// Get the initial authentication state from localStorage
		const savedState = localStorage.getItem("isAuthenticated");
		return savedState === "true";
	});

	const login = () => {
		setIsAuthenticated(true);
		localStorage.setItem("isAuthenticated", "true"); // Persist state
	};

	const logout = () => {
		setIsAuthenticated(false);
		localStorage.setItem("isAuthenticated", "false"); // Persist state
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
