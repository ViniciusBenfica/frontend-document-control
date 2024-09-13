import type { IDocuments, IDocumentsApi } from "@/types/IDocuments";

export function documentsMapper(item: IDocumentsApi): IDocuments {
	return {
		id: item?.id,
		title: item?.title,
		description: item?.description,
	};
}
