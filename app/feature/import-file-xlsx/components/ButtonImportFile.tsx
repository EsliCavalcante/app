import { Button } from "~/components/ui/button";
import useButtonImportFile from "../hooks/useButtonImportFile";

export default function ButtonImportFile(props: {
	onError?: (error: string | null) => void;
	onLoadSuccess?: (file: File) => void;
}) {
	const useButtonInportFile = useButtonImportFile({
		...props,
	});

	return (
		<div className="w-fit">
			<input {...useButtonInportFile.inputProps} />

			<h2 className="mb-4 text-lg font-bold ">Carregar arquivo</h2>
			<Button {...useButtonInportFile.buttonProps}>
				Selecionar arquivo
			</Button>
		</div>
	);
}
