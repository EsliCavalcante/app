import { FileSpreadsheet } from "lucide-react";
import ButtonImportFile from "~/feature/import-file-xlsx/components/ButtonImportFile";

export default function ButtonImport() {
	return (
		<div
			className="group flex cursor-pointer flex-col  items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/40 bg-muted/10 p-8 shadow-lg transition-colors hover:border-muted-foreground "
			onClick={undefined}
		>
			<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted/50  transition-transform group-hover:scale-110 ">
				<FileSpreadsheet className="size-8" />
			</div>
			<ButtonImportFile
				onLoadSuccess={(file) => {
					console.log(file);
				}}
				onError={(error) => {
					console.log(error);
				}}
			/>
			{true && (
				<p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
					{/* {file.name} ({size.size}
							{size.unit}) */}
				</p>
			)}
		</div>
	);
}
