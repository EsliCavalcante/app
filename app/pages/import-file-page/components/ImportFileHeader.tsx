import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export default function ImportFileHeader() {
	return (
		<div className="flex justify-between border-b items-center p-5 shrink-0 ">
			<Button asChild variant={"ghost"} className="gap-4  p-0">
				<Link to={"/"}>
					<ArrowLeft className="size-6" />
					Carregar arquivo
				</Link>
			</Button>
		</div>
	);
}
