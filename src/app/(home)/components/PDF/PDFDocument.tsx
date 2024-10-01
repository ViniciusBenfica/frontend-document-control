import type { IEnterpriseOnDocument } from "@/types/IEnterpriseOnDocument";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

interface IProps {
	data: IEnterpriseOnDocument[];
}

const styles = StyleSheet.create({
	page: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#FFF",
		padding: 20,
	},
	header: {
		marginBottom: 20,
		textAlign: "center",
		fontSize: 20,
	},
	footer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		textAlign: "center",
		fontSize: 10,
		color: "#666",
	},
	section: {
		marginBottom: 10,
		padding: 10,
		border: "1px solid #E4E4E4",
		borderRadius: 5,
		backgroundColor: "#F9F9F9",
	},
	sectionTitle: {
		fontSize: 14,
		marginBottom: 5,
	},
	sectionContent: {
		fontSize: 12,
		marginBottom: 2,
		color: "#333",
	},
	bold: {},
});

export default function PDFDocument({ data }: IProps) {
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* <Text style={styles.header}>Visão geral</Text> */}

				{data.map((item, index) => (
					<View key={index} style={styles.section}>
						<Text style={styles.sectionTitle}>{item.enterpriseName}</Text>
						<Text style={styles.sectionContent}>
							<Text style={styles.bold}>CNPJ:</Text> {item.enterpriseCNPJ}
						</Text>
						<Text style={styles.sectionContent}>
							<Text style={styles.bold}>Documento:</Text> {item.documentTitle}
						</Text>
						<Text style={styles.sectionContent}>
							<Text style={styles.bold}>Data de emissão:</Text> {item.issueDate}
						</Text>
						<Text style={styles.sectionContent}>
							<Text style={styles.bold}>Data de vencimento:</Text> {item.dueDate}
						</Text>
					</View>
				))}

				<Text style={styles.footer}>Gerado em: {new Date().toLocaleDateString()}</Text>
			</Page>
		</Document>
	);
}
