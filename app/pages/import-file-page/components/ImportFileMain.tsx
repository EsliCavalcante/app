import { FileSpreadsheet } from "lucide-react";
import SelectSheet from "./SelectSheet";
import SelectColumnsHeader from "./SelectColumnsHeader";
import ButtonImportFile from "~/feature/import-file-xlsx/components/ButtonImportFile";
import type useFileImportXlsxRoute from "~/routes/use-file-import-xlsx-route";
import { Button } from "~/components/ui/button";

export default function ImportFileMain(
	props: ReturnType<typeof useFileImportXlsxRoute>,
) {
	return (
		<div className="flex-1 px-5 py-6 overflow-y-auto space-y-6">
			<section className="space-y-6">
				<div
					className="group flex cursor-pointer flex-col  items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/40 bg-muted/10 p-8 shadow-lg transition-colors hover:border-muted-foreground "
					onClick={undefined}
				>
					<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted/50  transition-transform group-hover:scale-110 ">
						<FileSpreadsheet className="size-8" />
					</div>
					<ButtonImportFile
						onLoadSuccess={props.handleFileLoadSuccess}
					/>
					{true && (
						<p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400"></p>
					)}
				</div>
			</section>

			<section
				className="relative bg-[url('/banner.png')] h-50 lg:h-70 bg-size-[100%_120%] 
  					lg:bg-size-[100%_120%]  bg-no-repeat bg-position-[center_-16px] overflow-hidden border rounded-3xl bg-muted/10 p-8 text-foreground shadow-lg md:col-span-1"
			>
				<div className="absolute inset-0  bg-black/10" />
			</section>

			<section className="space-y-6.5">
				<SelectSheet
					disabled={props.isSelectFile}
					values={props.selectValuesSheets}
					onValueChange={props.handleValueSelectSheetChange}
				/>
				<SelectColumnsHeader
					onValueContainerChange={props.handleValueContainerChange}
					onValueTempChange={props.handleValueTempChange}
					onValuePositionChange={props.handleValuePositionChange}
					disabled={props.isSelectSheet}
					values={props.selectValuesHeaders}
				/>
			</section>

			<section className="px-0 py-6 flex justify-between flex-col lg:flex-row gap-4 border-t">
				<Button
					variant={"outline"}
					className="py-3.5 flex-1 order-2 lg:order-1"
				>
					cancelar
				</Button>
				<Button
					onClick={props.handleProcess}
					className="py-3.5 flex-1 order-1 "
				>
					Processar
				</Button>
			</section>
		</div>
	);
}
