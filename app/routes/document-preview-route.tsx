import type { Route } from "./+types/document-preview-route";
import DocumentPreview from "~/components/document-preview-pdf/DocumentPreviewPdf";
export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Document preview" },
		{
			name: "description",
			content: "pré vizualização do documento ",
		},
	];
}

export default function DocumentPreviewRoute() {
	return <DocumentPreview />;
}
