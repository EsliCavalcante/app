import { Outlet } from "react-router";

export default function Layout() {
	return (
		<main className="h-full w-full bg-gray-50 ">
			<Outlet />
		</main>
	);
}
