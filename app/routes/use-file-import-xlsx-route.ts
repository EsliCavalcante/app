import { useMemo, useState } from "react";
import { useMonitoringStore } from "~/store/monitoring-store/use-monitoring-store";
import type { HeaderSpreadsheet } from "~/type";
import getSpreadsheet from "~/utils/getSpreadsheet";
import getSpreadsheetHeader from "~/utils/getSpreadsheetHeader";
import { containerDTO } from "~/utils/monitoringDTO";

type Spreadsheet = Record<string, number>;

export default function useFileImportXlsxRoute() {
	const setMonitorings = useMonitoringStore((state) => state.setMonitorings);
	const [headerSpreadsheet, setHeaderSpreadsheet] =
		useState<HeaderSpreadsheet>({
			worksheet: "",
			container: "",
			temperature: "",
		});
	const [spreadsheets, setSpreadsheets] = useState<Spreadsheet | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [selectValuesHeaders, setSelectValuesHeaders] = useState<string[]>(
		[],
	);
	const [sheet, setSheet] = useState<number>(-1);

	const handleFileLoadSuccess = async (file: File) => {
		const buffer = await file.arrayBuffer();
		setFile(file);
		setSpreadsheets(await getSpreadsheet(buffer));
	};

	const handleValueSelectSheetChange = async (sheet: string) => {
		if (file && spreadsheets) {
			const headers = await getSpreadsheetHeader(
				await file.arrayBuffer(),
				spreadsheets[sheet],
			);
			setSheet(spreadsheets[sheet]);
			setHeaderSpreadsheet((state) => ({ ...state, worksheet: sheet }));
			setSelectValuesHeaders(headers);
		}
	};

	const handleValueContainerChange = (container: string) => {
		setHeaderSpreadsheet((state) => ({ ...state, container: container }));
	};

	const handleValueTempChange = (temp: string) => {
		setHeaderSpreadsheet((state) => ({ ...state, temperature: temp }));
	};

	const handleValuePositionChange = (position: string) => {
		setHeaderSpreadsheet((state) => ({ ...state, position }));
	};

	const handleProcess = async () => {
		if (file && spreadsheets) {
			setMonitorings(await containerDTO(file, headerSpreadsheet, sheet));
		}
	};

	const selectValuesSheets = useMemo(() => {
		if (spreadsheets) return Object.keys(spreadsheets);
		return [];
	}, [spreadsheets]);

	const isSelectFile = file ? false : true;
	const isSelectSheet = selectValuesHeaders.length === 0 ? true : false;

	return {
		isSelectFile,
		isSelectSheet,
		selectValuesHeaders,
		selectValuesSheets,
		handleProcess,
		handleFileLoadSuccess,
		handleValueTempChange,
		handleValuePositionChange,
		handleValueContainerChange,
		handleValueSelectSheetChange,
	};
}
