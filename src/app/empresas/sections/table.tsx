import TableComponent from "@/app/components/table";
import type IEnterprise from "@/app/types/IEnterprise";

interface IProps {
	categories: IEnterprise[];
}

export default async function TableSection(props: IProps) {
	const rows = props.categories.map((category) => ({
		key: category.id,
		nome: category.name,
		cnpj: category.cnpj,
	}));

	const columns = [
		{
			key: "nome",
			label: "NAME",
		},
		{
			key: "cnpj",
			label: "CNPJ",
		},
	];

	return (
		<div className="flex h-full w-full items-center justify-center">
			<TableComponent rows={rows} columns={columns} />
		</div>
	);
}
