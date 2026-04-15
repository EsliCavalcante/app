import type { Monitoring, PreviewPage, PreviewRow } from "~/type";
export const rowsPerPage = 30;
export const minimumPages = 4;

function formatTemperature(value: number | null) {
	if (value === null || Number.isNaN(value)) return "";
	return `${value >= 0 ? "+" : ""}${value.toFixed(1)}\u00B0C`;
}

function buildFallbackRows(count: number): PreviewRow[] {
	return Array.from({ length: count }, (_, index) => ({
		qty: index + 1,
		container: "",
		position: "",
		temp: "",
		supply: "",
		return: "",
		remarks: "",
	}));
}

export function buildDocumentPreviewPages(data: Monitoring[]): PreviewPage[] {
	const mappedRows = data.map((item, index) => ({
		qty: index + 1,
		container: item.id,
		position: item.position,
		temp: formatTemperature(item.temperature),
		supply: formatTemperature(item.supply),
		return: formatTemperature(item.return),
		remarks: item.remarks ?? "",
	}));

	// 188 rows
	const rows = [
		...mappedRows,
		...buildFallbackRows(
			Math.ceil(mappedRows.length / rowsPerPage) * rowsPerPage -
				mappedRows.length,
		).map((row, index) => ({
			...row,
			qty: mappedRows.length + index + 1,
		})),
	];

	const totalPages = Math.max(0, Math.ceil(rows.length / rowsPerPage));

	return Array.from({ length: totalPages }, (_, pageIndex) => ({
		pageNumber: pageIndex + 1,
		rows: rows.slice(
			pageIndex * rowsPerPage,
			(pageIndex + 1) * rowsPerPage,
		),
	}));
}
