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

interface IProps<T> {
	rows: T[];
	columns: { key: string; label: string }[];
	formatter?: (value: string) => string;
}

export default async function TableComponent<T extends { key: string }>({
	rows,
	columns,
}: IProps<T>) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Table>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn className="bg-[#27272a] p-5 text-white" key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={rows}>
					{rows.map((item, index) => (
						<TableRow className={`${index % 2 === 1 ? "bg-gray-300" : "bg-white"}`} key={item.key}>
							{columns.map((column) => (
								<TableCell className="p-2" key={column.key}>
									{getKeyValue(item, column.key)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
