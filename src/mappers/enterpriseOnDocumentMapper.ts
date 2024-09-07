import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";

export function enterpriseOnDocumentMapper(item: IEnterpriseOnDocumentApi): IEnterpriseOnDocument {
	return {
		key: item?.id,
		enterpriseName: item?.enterprise?.name,
		enterpriseCNPJ: item?.enterprise?.cnpj,
		documentTitle: item?.document?.title,
		documentDescription: item?.document?.description,
		issueDate: item?.issueDate.split("T")[0],
		dueDate: item?.dueDate.split("T")[0],
	};
}
