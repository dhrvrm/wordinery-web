import { useAuth } from "@/store/AuthContext";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
	const { logout } = useAuth();

	return (
		<div>
			<header className='flex flex-row p-2 justify-between'>
				<h1>App Header</h1>
				<button onClick={logout}>Logout</button>
			</header>
			<main>
				<Outlet /> {/* This is where the nested routes will be rendered */}
			</main>
			<footer>
				<p>App Footer</p>
			</footer>
		</div>
	);
};

export default AppLayout;
