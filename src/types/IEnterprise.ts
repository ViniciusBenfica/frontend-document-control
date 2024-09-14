export interface IEnterpriseApi {
	id: string;
	name: string;
	cnpj: string;
	documents: {
		documentId: string;
		title: string;
		description: string;
		issueDate: string;
		dueDate: string;
	}[];
}
export interface IEnterprise {
	id: string;
	name: string;
	cnpj: string;
	documents: {
		documentId: string;
		title: string;
		description: string;
		issueDate: string;
		dueDate: string;
	}[];
}
