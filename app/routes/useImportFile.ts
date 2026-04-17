import { useRef, useState } from "react";
import { getSpreadsheet } from "~/pages/import-file-page/shared/getSpreadsheet";
import { getSpreadsheetHeaders } from "~/pages/import-file-page/shared/getSpreeadsheetHeaders";
import { monitoringDTO } from "~/pages/import-file-page/shared/monitoringDTO";
import { useAlertDialogStore } from "~/store/alert-dialog-store/use-alert-dialog-store";
import { useCacheStore } from "~/store/cache-store/use-cache-store";
import { useMonitoringStore } from "~/store/monitoring-store/use-monitoring-store";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { formatFileSize } from "~/shared/formatFileSize";

const SELECTED_STATE_INITIAL = {
	container: "",
	temperature: "",
	position: "",
	worksheet: "",
};

const HEADERS_STATE_INITIAL: Array<string> = [];

export function getHeadersFiltered(
	headers: Array<string>,
	filter: Array<string>,
) {
	return headers.filter((header) => {
		return !filter.includes(header);
	});
}

export function getWorksheets(worksheets: Record<string, number>) {
	return Object.keys(worksheets);
}

export default function useImportFile() {
	const openAlertDialog = useAlertDialogStore((state) => state.open);

	const setSize = useCacheStore((state) => state.setSize);
	const mergeMonitorings = useMonitoringStore(
		(state) => state.mergeMonitorings,
	);
	const size = useCacheStore((state) => state.size);
	const setMonitorings = useMonitoringStore((state) => state.setMonitorings);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [headers, setHeaders] = useState(HEADERS_STATE_INITIAL);
	const [worksheet, setWorksheet] = useState<Record<string, number>>({});
	const [selected, setSelected] = useState(SELECTED_STATE_INITIAL);
	const navigate = useNavigate();

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
	) => {
		setSelected(SELECTED_STATE_INITIAL);
		setHeaders(HEADERS_STATE_INITIAL);
		setFile(null);
		const selectedFile = event.currentTarget.files?.[0] ?? null;

		if (!selectedFile) return;

		try {
			const worksheets = await getSpreadsheet(selectedFile);
			setFile(selectedFile);
			setWorksheet(worksheets);
		} catch (error) {
			const description =
				error instanceof Error
					? error.message
					: "Nao foi possivel ler este .xlsx neste ambiente.";
			toast.error("Erro ao carregar arquivo", {
				description,
				position: "top-left",
			});
		}
	};

	const handleSelectChangeContainer = (container: string) => {
		setSelected((state) => ({ ...state, container }));
	};
	const handleSelectChangeTemp = (temperature: string) => {
		setSelected((state) => ({ ...state, temperature }));
	};
	const handleSelectChangePosition = (position: string) => {
		setSelected((state) => ({ ...state, position }));
	};

	const handleSelectChangeWorksheets = async (value: string) => {
		setSelected((state) => ({ ...state, worksheet: value }));

		setHeaders(await getSpreadsheetHeaders(file as File, worksheet[value]));
	};

	const handleMergeData = async () => {
		const data = await monitoringDTO(
			file as File,
			selected,
			worksheet[selected.worksheet],
		);
		if (file) setSize(file.size);

		mergeMonitorings(data);
		toast.success(`${file?.name.toLocaleLowerCase()}`, {
			description: ` dados foi mesclado com sucesso`,
			duration: 6000,
			position: "top-left",
		});
		navigate("/");
	};

	const handleOverwriteData = async () => {
		const data = await monitoringDTO(
			file as File,
			selected,
			worksheet[selected.worksheet],
		);

		if (file) {
			setSize(file.size);
		}

		setMonitorings(data);
		toast.success(`${file?.name.toLocaleLowerCase()}`, {
			description: ` carregado com sucesso`,
			duration: 6000,
			position: "top-left",
		});
		navigate("/");
	};

	const handleProcessData = async () => {
		const hasDataInCached = size;
		if (hasDataInCached) {
			openAlertDialog({
				title: "Detectamos dados armazenados",
				actionLabel: "Mesclar",
				cancelLabel: "Sobrescrever",
				description:
					"Existem dados previamente armazenados em cache. Escolha entre sobrescrever completamente ou mesclar com os novos dados importados.",
				onConfirm: handleMergeData,
				onCancel: handleOverwriteData,
			});
			return;
		}

		const data = await monitoringDTO(
			file as File,
			selected,
			worksheet[selected.worksheet],
		);

		if (file) {
			setSize(file.size);
		}

		setMonitorings(data);
		toast.success(`${file?.name.toLocaleLowerCase()}`, {
			description: ` carregado com sucesso`,
			duration: 6000,
			position: "top-left",
		});
		navigate("/");
	};

	return {
		file,
		size: formatFileSize(file ? file.size : 0),
		headers,
		selected,
		worksheet,
		fileInputRef,
		isFileSelected: file !== null,
		isSelectedContainer: selected.container !== "",
		isSelectedWorksheet: selected.worksheet !== "",
		isSelectedTemp: selected.temperature !== "",
		isSelectedPosition: selected.position !== "",
		handleFileChange,
		handleProcessData,
		handleSelectChangeTemp,
		handleSelectChangePosition,
		handleSelectChangeContainer,
		handleSelectChangeWorksheets,
	};
}
