import ImportFileHeader from "./ImportFileHeader";
import ImportFileMain from "./ImportFileMain";
import ImportFileFooter from "./ImportFileFooter";
import type useFileImportXlsxRoute from "~/routes/use-file-import-xlsx-route";

export default function ImportFileRoot(
	props: ReturnType<typeof useFileImportXlsxRoute>,
) {
	return (
		<div className="flex flex-col  h-full w-1/1 sm:w-2/6  mx-auto">
			<ImportFileHeader />
			<ImportFileMain {...props} />
			<ImportFileFooter />
		</div>
	);
}
