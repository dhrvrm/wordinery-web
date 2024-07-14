import { Link } from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<h1>Cannot find this route, please use go to </h1>
			<Link to='/app'> Home</Link>
		</>
	);
};

export default Error404;
