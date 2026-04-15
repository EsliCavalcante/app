export type Monitoring = {
	id: string;
	temperature: number | null;
	supply: number | null;
	return: number | null;
	position: string;
	remarks?: string;
};

export type PreviewRow = {
	qty: number;
	container: string;
	position: string;
	temp: string;
	supply: string;
	return: string;
	remarks: string;
};

export type PreviewPage = {
	pageNumber: number;
	rows: PreviewRow[];
};

export type TemperatureLogSheetPdfProps = {
	pages: PreviewPage[];
	logoSrc: string;
};
