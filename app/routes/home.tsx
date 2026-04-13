import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Monitoring" },
		{
			name: "description",
			content: "App de gerenciamento  de relatórios ",
		},
	];
}

export default function Home() {
	return <p>casa</p>;
}
