import ExcelJS from "exceljs";
import type { HeaderSpreadsheet, Monitoring } from "~/type";
import { extractNumberNormalize } from "./extractNumberNormalize";

export async function containerDTO(
	file: File,
	headers: HeaderSpreadsheet,
	worksheetNumber: number,
): Promise<Monitoring[]> {
	const buffer = await file.arrayBuffer();

	const workbook = new ExcelJS.Workbook();
	await workbook.xlsx.load(buffer);

	const worksheet = workbook.worksheets[worksheetNumber];

	const data: Monitoring[] = [];

	// agora usando número corretamente
	const columns = {
		id: -1,
		temperature: -1,
		position: -1,
	};

	worksheet.eachRow((row, rowNumber) => {
		// 🧠 1. HEADER
		if (rowNumber === 1) {
			row.eachCell((cell, colNumber) => {
				const value = String(cell.value);

				if (value === headers.container) columns.id = colNumber;
				if (value === headers.temperature)
					columns.temperature = colNumber;
				if (headers.position && value === headers.position) {
					columns.position = colNumber;
				}
			});

			return; // pula header
		}

		if (columns.id < 1 || columns.temperature < 1) {
			throw new Error("Required column mapping not found in worksheet");
		}

		// 🧠 2. LINHAS DE DADOS
		const idCell = row.getCell(columns.id).value;
		if (!idCell) return; // ignora linha vazia

		const temperatureCell = row.getCell(columns.temperature).value;
		const positionCell =
			columns.position > 0 ? row.getCell(columns.position).value : "";

		const id = String(idCell);
		const temperature = extractNumberNormalize(String(temperatureCell));

		const rawPosition = String(positionCell ?? "");
		const position = rawPosition.includes("-")
			? rawPosition.split("-")[1]
			: rawPosition;

		const container: Monitoring = {
			id,
			temperature,
			supply: null,
			return: null,
			position,
			remarks: "",
		};

		data.push(container);
	});

	return data;
}
