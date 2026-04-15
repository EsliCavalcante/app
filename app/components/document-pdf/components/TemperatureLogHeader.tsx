import { Image, Text, View } from "@react-pdf/renderer";
import { staticDocumentMeta } from "../config/constants";
import { styles } from "../style";

type TemperatureLogHeaderProps = {
	logoSrc: string;
};

export function TemperatureLogHeader({ logoSrc }: TemperatureLogHeaderProps) {
	return (
		<>
			<View style={styles.headerWrap}>
				<View style={styles.headerRow}>
					<View style={styles.logoBox}>
						<Image src={logoSrc} style={styles.logo} />
					</View>
					<View style={styles.headerMeta}>
						<View style={styles.metaItem}>
							<Text style={styles.metaLabel}>Port</Text>
							<View style={[styles.metaValueLine, { width: 130 }]}>
								<Text style={styles.metaValue}>{staticDocumentMeta.port}</Text>
							</View>
						</View>
						<View style={styles.metaItem}>
							<Text style={styles.metaLabel}>Vessel</Text>
							<View style={[styles.metaValueLine, { width: 180 }]}>
								<Text style={styles.metaValue}>{staticDocumentMeta.vessel}</Text>
							</View>
						</View>
						<View style={styles.metaItem}>
							<Text style={styles.metaLabel}>Voyage</Text>
							<View style={[styles.metaValueLine, { width: 80 }]}>
								<Text style={styles.metaValue}>{staticDocumentMeta.voyage}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

			<Text style={styles.title}>{staticDocumentMeta.title}</Text>
		</>
	);
}
