import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/types/IEnterpriseOnDocument";

export function enterpriseOnDocumentMapper(
	item: IEnterpriseOnDocumentApi[],
): IEnterpriseOnDocument[] {
	return item.map((item) => {
		return {
			key: item?.id,
			enterpriseName: item?.enterprise?.name,
			enterpriseCNPJ: item?.enterprise?.cnpj,
			documentTitle: item?.document?.title,
			documentDescription: item?.document?.description,
			issueDate: item?.issueDate,
			dueDate: item?.dueDate,
		};
	});
}
