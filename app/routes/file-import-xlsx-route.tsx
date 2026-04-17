import type { Route } from "../+types/root";
import { ImportFilePage } from "~/pages/import-file-page/";
import useFileImportXlsxRoute from "./use-file-import-xlsx-route";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Monitoring" },
		{
			name: "description",
			content: "Carregar arquivo xlsx para gerar os dados",
		},
	];
}

export default function FileImportXlsxRoute() {
	const props = useFileImportXlsxRoute();

	return <ImportFilePage.ImportFilePageRoot {...props} />;
}
