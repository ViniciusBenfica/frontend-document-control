"use client";

import DeleteModal from "@/components/deleteModal";
import { axiosHttpAdapter, type httpClient } from "@/service";
import { truncateString } from "@/utils/tuncateString";
import { parseDate } from "@internationalized/date";
import {
	DateRangePicker,
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
import CloseIcon from "/public/icon/closeIcon.svg";
import EditIcon from "/public/icon/editIcon.svg";

export interface IFilter {
	text?: string | null;
	date?: { start: string | null; end: string | null };
}

interface IProps<T> {
	rows: T[];
	path?: string;
	columns: { key: string; label: string; sortable?: boolean }[];
	deleteFunction?: (httpClient: httpClient, id: string) => void;
	filterFunction?: (httpClient: httpClient, value: IFilter) => void;
	downloadButton?: React.ReactNode;
}

export default function TableComponent<T>({
	rows,
	columns,
	path,
	deleteFunction,
	filterFunction,
	downloadButton,
}: IProps<T>) {
	const [page, setPage] = useState(1);
	const [filterValue, setFilterValue] = useState<IFilter>({
		text: null,
		date: { start: null, end: null },
	});
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: undefined,
		direction: "ascending",
	});

	const debouncedFilter = useCallback(
		debounce((values) => {
			if (filterFunction) {
				filterFunction(axiosHttpAdapter, values);
			}
		}, 500),
		[filterFunction],
	);

	const handleFilterChange = (value: IFilter) => {
		const newFilterValues = {
			...filterValue,
			...value,
		};
		setFilterValue(newFilterValues);
		debouncedFilter(newFilterValues);
	};

	const clearDateFilter = () => {
		const clearedFilterValues = {
			...filterValue,
			date: { start: null, end: null },
		};
		setFilterValue(clearedFilterValues);
		debouncedFilter(clearedFilterValues);
	};

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
				topContent={
					<div className="flex justify-between">
						{filterFunction && (
							<div className="flex gap-2">
								<Input
									className="w-full"
									placeholder="Pesquise aqui..."
									onValueChange={(e) => handleFilterChange({ text: e })}
								/>
								<DateRangePicker
									value={
										filterValue?.date?.start && filterValue?.date?.end
											? {
													start: parseDate(filterValue.date.start),
													end: parseDate(filterValue.date.end),
												}
											: null
									}
									onChange={(e) =>
										handleFilterChange({
											date: { start: e.start.toString(), end: e.end.toString() },
										})
									}
								/>
								{filterValue?.date?.start && filterValue?.date?.end && (
									<button type="button" onClick={clearDateFilter} className="rounded">
										<CloseIcon />
									</button>
								)}
							</div>
						)}
						{downloadButton}
					</div>
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
