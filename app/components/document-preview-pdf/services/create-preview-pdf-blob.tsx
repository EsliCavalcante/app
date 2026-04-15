import { pdf } from "@react-pdf/renderer";
import { TemperatureLogSheetPdf } from "../../document-pdf/DocumentPdf";
import { buildDocumentPreviewPages } from "../../document-pdf/utils/buildDocumentPreviewPages";
import { DOCUMENT_PREVIEW_LOGO_SRC } from "../config/document-preview.constants";
import type { Monitoring } from "~/type";

export async function createPreviewPdfBlob(monitorings: Monitoring[]) {
	const previewPages = buildDocumentPreviewPages(monitorings);

	return pdf(
		<TemperatureLogSheetPdf
			logoSrc={DOCUMENT_PREVIEW_LOGO_SRC}
			pages={previewPages}
		/>,
	).toBlob();
}
