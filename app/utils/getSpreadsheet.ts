import type { Spreadsheets } from "~/type";

export default async function getSpreadsheet(fileArrayBuffer: ArrayBuffer) {
	const excelModule = await import("exceljs");
	const ExcelJS = excelModule.default ?? excelModule;

	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(fileArrayBuffer);

	const spreadsheets = workbook.worksheets.reduce(
		(acc, pre, currentPosition) => {
			acc[pre.name] = currentPosition;
			return acc;
		},
		{} as Spreadsheets,
	);

	return spreadsheets;
}
