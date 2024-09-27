"use client";

import DeleteModal from "@/components/deleteModal";
import { axiosHttpAdapter, type httpClient } from "@/service";
import { truncateString } from "@/utils/tuncateString";
import {
	Input,
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
import debounce from "debounce";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import EditIcon from "/public/icon/editIcon.svg";

interface IProps<T> {
	rows: T[];
	path?: string;
	columns: { key: string; label: string; sortable?: boolean }[];
	deleteFunction?: (httpClient: httpClient, id: string) => void;
	filterFunction?: (httpClient: httpClient, value: string) => Promise<T[]>;
}

export default function TableComponent<T>({
	rows,
	columns,
	path,
	deleteFunction,
	filterFunction,
}: IProps<T>) {
	const [row, setRow] = useState(rows);
	const [page, setPage] = useState(1);
	const [filterValue, setFilterValue] = useState("");
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: undefined,
		direction: "ascending",
	});

	const filter = async (value: string) => {
		if (filterFunction) {
			setRow(await filterFunction(axiosHttpAdapter, value));
		}
	};

	const debouncedFilter = useCallback(debounce(filter, 1000), []);

	// const {activePage, range, setPage, onNext, onPrevious} = usePagination({
	//   total: 6,
	//   showControls: true,
	//   siblings: 10,
	//   boundaries: 10,
	// });

	const rowsPerPage = 6;
	const pages = Math.ceil(row.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		const slicedItems = row.slice(start, end);

		return [...slicedItems, ...Array(rowsPerPage - slicedItems.length)];
	}, [page, row]);

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
				topContent={
					filterFunction && (
						<Input
							className="w-full sm:max-w-[44%]"
							placeholder="Pesquise aqui..."
							value={filterValue}
							onValueChange={(e) => {
								debouncedFilter(e);
								setFilterValue(e);
							}}
						/>
					)
				}
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
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
										truncateString(getKeyValue(item, column.key), 20)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
