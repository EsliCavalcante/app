import { DOCUMENT_PREVIEW_FILE_EXTENSION } from "../config/document-preview.constants";

export function downloadPdfBlob(blob: Blob, fileName: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");

	a.href = url;
	a.download = `${fileName}${DOCUMENT_PREVIEW_FILE_EXTENSION}`;
	a.click();

	URL.revokeObjectURL(url);
}
