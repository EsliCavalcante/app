import { Page, View } from "@react-pdf/renderer";
import type { PreviewPage } from "~/type";
import { createColumnDefinitions } from "../config/columns";
import { styles } from "../style";
import { TemperatureLogFooter } from "./TemperatureLogFooter";
import { TemperatureLogHeader } from "./TemperatureLogHeader";
import { TemperatureLogRow } from "./TemperatureLogRow";
import { TemperatureLogTableHeader } from "./TemperatureLogTableHeader";

type TemperatureLogPageProps = {
	page: PreviewPage;
	totalPages: number;
	logoSrc: string;
};

export function TemperatureLogPage({
	page,
	totalPages,
	logoSrc,
}: TemperatureLogPageProps) {
	const isEmptyPosition = page.rows[0]?.position === "";
	const columns = createColumnDefinitions(isEmptyPosition);

	return (
		<Page size={[800, 1200]} wrap={false} style={styles.page}>
			<View style={styles.card}>
				<TemperatureLogHeader logoSrc={logoSrc} />

				<View style={styles.table}>
					<TemperatureLogTableHeader columns={columns} />
					{page.rows.map((row, index) => (
						<TemperatureLogRow
							key={`${page.pageNumber}-${row.qty}`}
							row={row}
							columns={columns}
							index={index}
						/>
					))}
				</View>

				<TemperatureLogFooter
					pageNumber={page.pageNumber}
					totalPages={totalPages}
				/>
			</View>
		</Page>
	);
}
