import { Text, View } from "@react-pdf/renderer";
import { rowsPerPage } from "../utils/buildDocumentPreviewPages";
import type { ColumnDefinition } from "../config/columns";
import type { PreviewRow } from "~/type";
import { styles } from "../style";
import { renderCell } from "../utils/renderCell";

type TemperatureLogRowProps = {
	row: PreviewRow;
	columns: ColumnDefinition[];
	index: number;
};

export function TemperatureLogRow({
	row,
	columns,
	index,
}: TemperatureLogRowProps) {
	const isLastRow = index + 1 === rowsPerPage;

	return (
		<View
			style={[
				styles.tableRow,
				index % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven,
				isLastRow ? styles.tableRowLast : {},
			]}
		>
			{columns.map((column) => (
				<Text
					key={column.key}
					style={[
						styles.cell,
						styles.tableBodyCell,
						column.key === "remarks" ? styles.lastCell : {},
						{
							width: column.width,
							flexGrow: column.flexGrow,
							textAlign: column.textAlign,
							fontWeight: column.key === "container" ? 800 : 600,
						},
					]}
				>
					{renderCell(column.getValue(row))}
				</Text>
			))}
		</View>
	);
}
