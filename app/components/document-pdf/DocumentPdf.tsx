import { Document } from "@react-pdf/renderer";
import type { TemperatureLogSheetPdfProps } from "~/type";
import { TemperatureLogPage } from "./components/TemperatureLogPage";

export function TemperatureLogSheetPdf({
	pages,
	logoSrc,
}: TemperatureLogSheetPdfProps) {
	return (
		<Document>
			{pages.map((page) => (
				<TemperatureLogPage
					key={page.pageNumber}
					page={page}
					totalPages={pages.length}
					logoSrc={logoSrc}
				/>
			))}
		</Document>
	);
}
