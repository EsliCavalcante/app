export default async function getSpreadsheetHeader(
	fileArrayBuffer: ArrayBuffer,
	sheetNumber: number,
) {
	let isHeader = true;
	const headers: string[] = [];

	const excelModule = await import("exceljs");
	const ExcelJS = excelModule.default ?? excelModule;

	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(fileArrayBuffer);

	const worksheet = workbook.worksheets[sheetNumber];

	worksheet.eachRow((row) => {
		if (isHeader) {
			row.eachCell((cell) => {
				headers.push(String(cell.value));
			});

			isHeader = false;
		}
	});

	return headers;
}
