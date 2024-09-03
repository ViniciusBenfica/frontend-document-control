import type {
	IEnterpriseOnDocument,
	IEnterpriseOnDocumentApi,
} from "@/app/types/IEnterpriseOnDocument";

export function enterpriseOnDocumentMapper(
	item: IEnterpriseOnDocumentApi[],
): IEnterpriseOnDocument[] {
	return item.map((item) => {
		return {
			key: item?.id,
			enterprise: {
				id: item?.enterprise?.id,
				name: item?.enterprise?.name,
				cnpj: item?.enterprise?.cnpj,
			},
			document: {
				id: item?.document?.id,
				title: item?.document?.title,
				description: item?.document?.description,
			},
			issueDate: item?.issueDate,
			dueDate: item?.dueDate,
		};
	});
}
