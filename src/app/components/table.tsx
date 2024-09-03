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

interface IProps {
	rows: { key: string }[];
	columns: { key: string; label: string }[];
}

export default async function TableComponent({ rows, columns }: IProps) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Table>
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
	);
}
