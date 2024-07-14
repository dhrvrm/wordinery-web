import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout.layout";
import LandingPage from "./layouts/LandingPage.layout";
import LoginPage from "./layouts/Login.layout";
import { AuthProvider, useAuth } from "./store/AuthContext";
import WordForm from "./components/dashboard/WordForm.component";

const ProtectedRoute = ({ element }) => {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? element : <Navigate to='/login' />;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/app",
		element: <ProtectedRoute element={<AppLayout />} />,
		children: [
			{
				path: "",
				element: <WordForm />,
			},
		],
	},
	{
		path: "*",
		element: <ProtectedRoute element={<AppLayout />} />,
	},
]);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
