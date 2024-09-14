import type { IEnterprise, IEnterpriseApi } from "@/types/IEnterprise";

export function enterpriseMapper(item: IEnterpriseApi): IEnterprise {
	return {
		id: item?.id,
		name: item?.name,
		cnpj: item?.cnpj,
		documents: item?.documents?.map((doc) => ({
			documentId: doc.documentId,
			title: doc.title,
			description: doc.description,
			issueDate: doc.issueDate.split("T")[0],
			dueDate: doc.dueDate.split("T")[0],
		})),
	};
}
