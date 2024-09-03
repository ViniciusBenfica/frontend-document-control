import type { IDocuments, IDocumentsApi } from "@/types/IDocuments";

export function documentsMapper(item: IDocumentsApi[]): IDocuments[] {
	return item.map((item) => {
		return {
			key: item?.id,
			title: item?.title,
			description: item?.description,
		};
	});
}
