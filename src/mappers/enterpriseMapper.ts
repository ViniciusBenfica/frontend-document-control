import type { IEnterprise, IEnterpriseApi } from "@/types/IEnterprise";

export function enterpriseMapper(item: IEnterpriseApi): IEnterprise {
	return {
		id: item?.id,
		name: item?.name,
		cnpj: item?.cnpj,
	};
}
