import { pdfjs } from "react-pdf";

let isConfigured = false;

export function configurePdfWorker() {
	if (isConfigured) return;

	pdfjs.GlobalWorkerOptions.workerSrc = new URL(
		"pdfjs-dist/build/pdf.worker.min.mjs",
		import.meta.url,
	).toString();

	isConfigured = true;
}
