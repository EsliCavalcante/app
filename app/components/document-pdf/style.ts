import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
	family: "Poppins",
	fonts: [
		{ src: "Poppins-Bold.ttf", fontWeight: "bold" },
		{ src: "Poppins-Regular.ttf", fontWeight: "hairline" },
		{ src: "Poppins-Medium.ttf", fontWeight: "demibold" },
		{ src: "Poppins-SemiBold.ttf", fontWeight: "extrabold" },
	],
});

export const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		fontWeight: "100",
		paddingTop: 10,
		paddingBottom: 10,
		paddingHorizontal: 10,
		fontFamily: "Poppins",
		fontSize: 10,
		color: "#111111",
	},
	card: {
		backgroundColor: "#ffffff",
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 8,
		paddingBottom: 10,
	},
	headerWrap: {},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoBox: {
		borderRadius: 4,
		width: 175,
		height: 90,
		borderWidth: 1,
		borderColor: "#ff3b30",
		padding: 0,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 14,
	},
	logo: {
		width: "90%",
	},
	headerMeta: {
		borderRadius: 4,
		borderColor: "#ff3b30",
		borderWidth: 1,
		paddingVertical: 29,
		paddingHorizontal: 8,
		flexDirection: "row",
		flexGrow: 1,
	},
	metaItem: {
		flexGrow: 1,
		gap: 2,
		alignItems: "center",
		flexDirection: "row",
	},
	metaLabel: {
		fontSize: 11,
		fontWeight: 700,
		textTransform: "uppercase",
	},
	metaValueLine: {
		marginTop: 8,
		paddingBottom: 13,
	},
	metaValue: {
		borderBottomWidth: 1,
		borderBottomColor: "#3f3f3f",
		marginLeft: 1,
		paddingLeft: 6,
		fontSize: 11,
		fontWeight: 600,
		textTransform: "uppercase",
		lineHeight: 1,
	},
	title: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: 600,
		color: "#ff2f26",
		textTransform: "uppercase",
		marginTop: 10,
		marginBottom: 12,
	},
	table: {
		borderWidth: 1,
		borderColor: "#fafafa",
	},
	tableHeader: {
		flexDirection: "row",
		backgroundColor: "#ea2b23",
		color: "#ffffff",
		alignItems: "center",
	},
	tableHeaderCell: {
		color: "#ffffff",
		fontWeight: 800,
	},
	tableRow: {
		flexDirection: "row",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: "#b8b8b8",
		borderWidth: 0,
	},
	tableRowOdd: {
		backgroundColor: "#b9b9b96c",
	},
	tableRowEven: {
		backgroundColor: "#ffffff",
	},
	tableRowLast: {
		borderBottomWidth: 1,
		borderBottomColor: "#bdbdbd",
	},
	cell: {
		padding: 7,
		fontSize: 10,
		textAlign: "center",
	},
	tableBodyCell: {
		borderRightWidth: 1,
		borderRightColor: "#d4d4d4",
		borderRightStyle: "solid",
		fontWeight: 600,
	},
	lastCell: {
		borderRightWidth: 0,
	},
	footerTop: {
		marginTop: 20,
		paddingHorizontal: 8,
	},
	footerTopRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	footerCheck: {
		width: 18,
		height: 18,
		backgroundColor: "#e62d23",
		marginLeft: 4,
		marginRight: 18,
	},
	footer: {
		marginTop: 22,
		borderWidth: 1,
		borderColor: "#ff3b30",
		paddingHorizontal: 10,
		paddingTop: 30,
		paddingBottom: 28,
	},
	footerRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	footerLabel: {
		fontSize: 11,
		fontWeight: 700,
		textTransform: "uppercase",
	},
	footerLine: {
		flexGrow: 1,
		borderBottomWidth: 1,
		borderBottomColor: "#4b4b4b",
		marginLeft: 2,
		marginRight: 10,
		marginTop: 6,
	},
	pageNumber: {
		marginTop: 8,
		textAlign: "center",
		fontSize: 10,
		color: "#444444",
	},
});
