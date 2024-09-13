export interface IEnterpriseOnDocumentApi {
	id: string;
	enterprise: {
		id: string;
		name: string;
		cnpj: string;
	};
	document: {
		id: string;
		title: string;
		description: string;
	};
	issueDate: string;
	dueDate: string;
}
export interface IEnterpriseOnDocument {
	id: string;
	enterpriseName: string;
	enterpriseCNPJ: string;
	documentTitle: string;
	documentDescription: string;
	issueDate: string;
	dueDate: string;
}
