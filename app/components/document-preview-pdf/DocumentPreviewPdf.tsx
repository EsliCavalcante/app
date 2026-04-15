import { Document, Page } from "react-pdf";
import { Button } from "../ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import DocumentPagination from "./DocumentPaginationPdf";
import useDocumentPreviewPdf, {
	getScale,
} from "./hooks/use-document.preview-pdf";
import { Link } from "react-router";
import DocumentDialog from "./DocumentDialog";
import { configurePdfWorker } from "./config/configure-pdf-worker";

configurePdfWorker();

export default function DocumentPreview() {
	const {
		handleNext,
		handlePrevious,
		numPages,
		onDocumentLoadSuccess,
		fileBlob,
		pageNumber,
		size,
		open,
		form,
		fileNameLength,
		fileNamePreview,
		handleOpenDialog,
		handleChangeOpen,
		handleSubmitDialog,
	} = useDocumentPreviewPdf();

	return (
		<div className="w-full  h-svh flex flex-col justify-between items-center overflow-auto">
			<div className="border flex justify-between items-center w-full p-5">
				<Button className="text-lg gap-1" variant={"ghost"} asChild>
					<Link to="/">
						<ArrowLeft className="size-6" /> Voltar
					</Link>
				</Button>
				<Button
					disabled={!fileBlob}
					onClick={handleOpenDialog}
					size={"lg"}
				>
					Download <Printer />
				</Button>
			</div>

			<Document
				file={fileBlob}
				noData={
					<p className="text-sm text-muted-foreground text-center w-80">
						Carregue um arquivo para gerar o documento...
					</p>
				}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page
					className="shadow-lg"
					width={size.width}
					renderTextLayer={false}
					scale={getScale(size.width)}
					renderAnnotationLayer={false}
					pageNumber={pageNumber}
				/>
			</Document>

			<div className="w-full border p-5 flex justify-center">
				<DocumentPagination
					numPages={numPages}
					pageNumber={pageNumber}
					onPrevious={handlePrevious}
					onNext={handleNext}
				/>
			</div>
			<DocumentDialog
				open={open}
				onOpenChange={handleChangeOpen}
				onSubmit={handleSubmitDialog}
				form={form}
				fileNameLength={fileNameLength}
				fileNamePreview={fileNamePreview}
			/>
		</div>
	);
}
