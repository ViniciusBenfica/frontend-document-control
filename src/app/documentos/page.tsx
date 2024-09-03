"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/table";

export default async function Documents() {
	const rows = [
		{
			key: "1",
			nome: "Tony Reichert",
			cpnj: "CEO",
		},
		{
			key: "2",
			nome: "Zoey Lang",
			cpnj: "Technical Lead",
		},
		{
			key: "3",
			nome: "Jane Fisher",
			cpnj: "Senior Developer",
		},
		{
			key: "4",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "5",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "6",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "7",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "8",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "9",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
		{
			key: "10",
			nome: "William Howard",
			cpnj: "Community Manager",
		},
	];

	const columns = [
		{
			key: "nome",
			label: "NAME",
		},
		{
			key: "cpnj",
			label: "CNPJ",
		},
	];

	return (
		<main className="w-full">
			<h1 className="-mb-6 mt-6 ml-6 font-bold text-3xl">Controle de empresas</h1>
			<div className="flex h-full items-center justify-center">
				<Table className="w-3/4">
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn className="bg-[#27272a] text-white" key={column.key}>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={rows}>
						{(item) => (
							<TableRow className="bg-[#18181b] text-white" key={item.key}>
								{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</main>
	);
}
