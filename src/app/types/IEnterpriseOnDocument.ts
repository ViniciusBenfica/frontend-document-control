export default interface IEnterpriseOnDocument {
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
	issueDate: Date;
	dueDate: Date;
}
