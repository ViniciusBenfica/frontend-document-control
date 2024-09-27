import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";

function formatDate(dateValue: string | Date): string {
	if (!dateValue) return "";
	const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
	return date.toLocaleDateString("pt-BR");
}

export function enterpriseOnDocumentMapper(item: IEnterpriseOnDocumentApi): IEnterpriseOnDocument {
	return {
		id: item?.id,
		enterpriseName: item?.enterprise?.name,
		enterpriseCNPJ: item?.enterprise?.cnpj,
		documentTitle: item?.document?.title,
		documentDescription: item?.document?.description,
		issueDate: formatDate(item?.issueDate.split("T")[0]),
		dueDate: formatDate(item?.dueDate.split("T")[0]),
	};
}
