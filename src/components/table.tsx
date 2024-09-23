"use client";

import {
	Pagination,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";

import EditIcon from "/public/icon/editIcon.svg";

import DeleteModal from "@/components/deleteModal";
import { axiosHttpAdapter, type httpClient } from "@/service";
import Link from "next/link";
import { useMemo, useState } from "react";

interface IProps<T> {
	rows: T[];
	path?: string;
	columns: { key: string; label: string; sortable?: boolean }[];
	deleteFunction?: (httpClient: httpClient, id: string) => void;
}

export default function TableComponent<T>({ rows, columns, path, deleteFunction }: IProps<T>) {
	const [page, setPage] = useState(1);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: undefined,
		direction: "ascending",
	});

	// const {activePage, range, setPage, onNext, onPrevious} = usePagination({
	//   total: 6,
	//   showControls: true,
	//   siblings: 10,
	//   boundaries: 10,
	// });

	const rowsPerPage = 6;
	const pages = Math.ceil(rows.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		const slicedItems = rows.slice(start, end);

		return [...slicedItems, ...Array(rowsPerPage - slicedItems.length)];
	}, [page, rows]);

	const sortedItems = useMemo(() => {
		return [...items].sort((a, b) => {
			const first = a[sortDescriptor.column as keyof T];
			const second = b[sortDescriptor.column as keyof T];
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<Table
				onSortChange={setSortDescriptor}
				sortDescriptor={sortDescriptor}
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							className="dark"
							size="lg"
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
						/>
					</div>
				}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							allowsSorting={column.sortable}
							className="bg-[#27272a] p-5 text-white"
							key={column.key}
						>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={sortedItems}>
					{sortedItems.map((item, index) => (
						<TableRow
							className={`${index % 2 === 1 ? "bg-gray-300" : "bg-white"} h-[40px]`}
							key={item?.id}
						>
							{columns.map((column) => (
								<TableCell key={column.key}>
									{item && column.key === "edit" && (
										<Link href={`/${path}/cadastro/${item?.id}`}>
											<EditIcon />
										</Link>
									)}
									{item && column.key === "remove" && deleteFunction && (
										<div className="cursor-pointer">
											<DeleteModal
												deleteFunction={() => deleteFunction(axiosHttpAdapter, item.id)}
											/>
										</div>
									)}
									{column.key !== "remove" &&
										column.key !== "edit" &&
										getKeyValue(item, column.key)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
