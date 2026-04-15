import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { documentDialogSchema } from "../schemas/document-dialog.schema";
import type { DocumentDialogSchema } from "../schemas/document-dialog.schema";
import { createPreviewPdfBlob } from "../services/create-preview-pdf-blob";
import { downloadPdfBlob } from "../services/download-pdf-blob";
import {
	DOCUMENT_PREVIEW_DEFAULT_FILE_NAME,
	DOCUMENT_PREVIEW_FILE_EXTENSION,
} from "../config/document-preview.constants";
import { useWindowSize } from "./use-window-size";
import { useMonitoringStore } from "~/store/monitoring-store/use-monitoring-store";
import { getScale } from "../strategies/preview-scale.strategy";

export type { DocumentDialogSchema };
export { getScale };

export default function useDocumentPreviewPdf() {
	const monitorings = useMonitoringStore((state) => state.monitorings);

	const size = useWindowSize();
	const [open, setOpen] = useState(false);
	const [numPages, setNumPages] = useState<number>(1);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [fileBlob, setFileBlob] = useState<Blob | undefined>(undefined);

	const form = useForm<DocumentDialogSchema>({
		resolver: zodResolver(documentDialogSchema),
		defaultValues: {
			fileName: "",
		},
		mode: "onSubmit",
	});

	function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
		setNumPages(numPages);
	}

	const handlePrevious = (previous: number) => {
		setPageNumber(previous);
	};

	const handleNext = (next: number) => {
		setPageNumber(next);
	};

	const handleOpenDialog = () => {
		setOpen(true);
	};

	const handleChangeOpen = (nextOpen: boolean) => {
		setOpen(nextOpen);
		if (!nextOpen) {
			form.reset();
		}
	};

	const handleSubmitDialog = form.handleSubmit(async (values) => {
		if (!fileBlob) return;

		downloadPdfBlob(fileBlob, values.fileName);
		setOpen(false);
		form.reset();
	});

	const fileNameValue = form.watch("fileName") ?? "";
	const fileNameLength = fileNameValue.length;
	const fileNamePreview = fileNameValue.trim()
		? `${fileNameValue.trim().replace(/\.pdf$/i, "")}${DOCUMENT_PREVIEW_FILE_EXTENSION}`
		: DOCUMENT_PREVIEW_DEFAULT_FILE_NAME;

	useEffect(() => {
		let isMounted = true;

		async function generatePdfBlob() {
			try {
				if (!monitorings.length) {
					if (isMounted) {
						setFileBlob(undefined);
						setNumPages(1);
					}
					return;
				}

				const blob = await createPreviewPdfBlob(monitorings);
				if (!isMounted) return;

				setFileBlob(blob);
				setPageNumber(1);
			} catch (error) {
				console.error("Erro ao gerar preview do PDF:", error);
				if (!isMounted) return;
				setFileBlob(undefined);
				setNumPages(1);
			}
		}

		generatePdfBlob();

		return () => {
			isMounted = false;
		};
	}, [monitorings]);

	return {
		onDocumentLoadSuccess,
		handlePrevious,
		handleNext,
		handleOpenDialog,
		handleChangeOpen,
		handleSubmitDialog,
		fileBlob,
		size,
		numPages,
		pageNumber,
		open,
		form,
		fileNameLength,
		fileNamePreview,
	};
}
