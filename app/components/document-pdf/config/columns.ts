import type { PreviewRow } from "~/type";
import { fixedColumns } from "./constants";

export type ColumnDefinition = {
	key: string;
	label: string;
	width?: number;
	flexGrow?: number;
	textAlign?: "left" | "center" | "right";
	fontWeight?: number;
	getValue: (row: PreviewRow) => string | number;
};

export function createColumnDefinitions(
	isEmptyPosition: boolean,
): ColumnDefinition[] {
	const columns: ColumnDefinition[] = [
		{
			key: "qty",
			label: "Qty.",
			width: fixedColumns.qty,
			textAlign: "center",
			fontWeight: 800,
			getValue: (row) => row.qty,
		},
		{
			key: "container",
			label: "Container",
			width: fixedColumns.container,
			fontWeight: 800,
			getValue: (row) => row.container,
		},
	];

	if (!isEmptyPosition) {
		columns.push({
			key: "position",
			label: "Position",
			width: fixedColumns.position,
			fontWeight: 800,
			getValue: (row) => row.position,
		});
	}

	columns.push(
		{
			key: "temp",
			label: "Temp",
			width: fixedColumns.temp,
			fontWeight: 800,
			getValue: (row) => row.temp,
		},
		{
			key: "supply",
			label: "Supply",
			width: fixedColumns.supply,
			textAlign: "center",
			fontWeight: 800,
			getValue: (row) => row.supply,
		},
		{
			key: "return",
			label: "Return",
			width: fixedColumns.return,
			textAlign: "center",
			fontWeight: 800,
			getValue: (row) => row.return,
		},
		{
			key: "remarks",
			label: "Remarks",
			flexGrow: 1,
			textAlign: "center",
			fontWeight: 800,
			getValue: (row) => row.remarks,
		},
	);

	return columns;
}
