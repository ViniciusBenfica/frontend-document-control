import type { IEnterprise, IEnterpriseApi } from "@/types/IEnterprise";

export function enterpriseMapper(item: IEnterpriseApi[]): IEnterprise[] {
	return item.map((item) => {
		return {
			key: item?.id,
			name: item?.name,
			cnpj: item?.cnpj,
			documentId: item?.documentId,
		};
	});
}
