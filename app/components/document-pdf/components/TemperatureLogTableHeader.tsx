import { Text, View } from "@react-pdf/renderer";
import type { ColumnDefinition } from "../config/columns";
import { styles } from "../style";

type TemperatureLogTableHeaderProps = {
	columns: ColumnDefinition[];
};

export function TemperatureLogTableHeader({
	columns,
}: TemperatureLogTableHeaderProps) {
	return (
		<View style={styles.tableHeader}>
			{columns.map((column) => (
				<Text
					key={column.key}
					style={[
						styles.cell,
						styles.tableHeaderCell,
						column.key === "remarks" ? styles.lastCell : {},
						{
							width: column.width,
							flexGrow: column.flexGrow,
							textAlign: column.textAlign,
							fontWeight: column.fontWeight,
						},
					]}
				>
					{column.label}
				</Text>
			))}
		</View>
	);
}
