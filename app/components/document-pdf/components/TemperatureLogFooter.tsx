import { Text, View } from "@react-pdf/renderer";
import { styles } from "../style";

type TemperatureLogFooterProps = {
	pageNumber: number;
	totalPages: number;
};

export function TemperatureLogFooter({
	pageNumber,
	totalPages,
}: TemperatureLogFooterProps) {
	return (
		<>
			<View style={styles.footerTop}>
				<View style={styles.footerTopRow}>
					<Text style={styles.footerLabel}>Plug-in</Text>
					<View style={styles.footerCheck} />
					<Text style={styles.footerLabel}>Arrival Time</Text>
					<View style={styles.footerLine} />
					<Text style={styles.footerLabel}>Departure Time</Text>
					<View style={styles.footerLine} />
				</View>
			</View>

			<View style={styles.footer}>
				<View style={styles.footerRow}>
					<Text style={styles.footerLabel}>Date</Text>
					<View style={styles.footerLine} />
					<Text style={styles.footerLabel}>Signature/Stamp</Text>
					<View style={styles.footerLine} />
					<Text style={styles.footerLabel}>Reeferbras Signature/Stamp</Text>
					<View style={styles.footerLine} />
				</View>
			</View>

			<Text style={styles.pageNumber}>
				pagina {pageNumber} de {totalPages}
			</Text>
		</>
	);
}
