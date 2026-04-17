import { Layers } from "lucide-react";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

export default function SelectSheet(props: {
	values: Array<string>;
	disabled?: boolean;
	onValueChange?: (value: string) => void;
}) {
	const [selectSheet, setSelectSheet] = useState("");

	const handleValueSheetChange = (sheet: string) => {
		if (sheet === "none") {
			if (props.onValueChange) props.onValueChange(sheet);
			setSelectSheet("");
			return;
		}
		if (props.onValueChange) props.onValueChange(sheet);
		setSelectSheet(sheet);
	};

	const values = [...props.values, "none"];

	return (
		<div className="rounded-3xl border  p-6 bg-muted/10 shadow-lg  md:col-span-4">
			<label className="mb-4 flex items-center gap-2 text-sm font-bold">
				<Layers className="size-4" />
				Selecionar folha
			</label>
			<Select
				disabled={props.disabled}
				value={selectSheet}
				onValueChange={handleValueSheetChange}
			>
				<SelectTrigger className="h-12 w-full py-5 lowercase">
					<SelectValue placeholder="Selecione a aba..." />
				</SelectTrigger>
				<SelectContent>
					{values.map((item, index) => (
						<SelectItem
							id="worksheet"
							key={item + index}
							className="py-3 lowercase"
							value={item}
						>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
