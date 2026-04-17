import { Button } from "~/components/ui/button";
import type { Route } from "./+types/home";
import { Link } from "react-router";

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
	return (
		<div>
			<Link to={"/import-file"}>
				<Button size="lg">preview</Button>
			</Link>
			<Link to={"/document-preview"}>
				<Button size="lg">preview</Button>
			</Link>
		</div>
	);
}
