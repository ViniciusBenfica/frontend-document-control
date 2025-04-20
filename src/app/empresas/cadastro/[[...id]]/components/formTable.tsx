"use client";

import DeleteDocument from "@/components/deleteModal";
import type { IDocuments } from "@/types/IDocuments";
import { DatePicker } from "@heroui/date-picker";
import { Pagination } from "@heroui/pagination";
import {
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@heroui/table";
import { parseDate } from "@internationalized/date";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Select, { type SelectInstance } from "react-select";
import { toast } from "react-toastify";
import type { FormValues } from "./formContext";

const columns = [
	{
		key: "documentTitle",
		label: "Documento",
	},
	{
		key: "issueDate",
		label: "Data de emissão",
	},
	{
		key: "dueDate",
		label: "Data de vencimento",
	},
	{
		key: "remove",
		label: "Remover",
	},
];

interface IProps {
	documents: IDocuments[];
}

export default function RegisterCompaniesFormTable({ documents }: IProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext<FormValues>();
	const documentsArray = documents.map((doc) => ({ label: doc.title, value: doc.id }));
	const { fields, prepend, remove } = useFieldArray({
		control,
		name: "documents",
	});

	const [page, setPage] = useState(1);
	const rowsPerPage = 3;
	const pages = Math.ceil(fields.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return fields.slice(start, end);
	}, [page, fields]);

	const selectRef = useRef<SelectInstance>(null);

	const handleSelectClick = () => {
		if (selectRef.current) {
			selectRef.current.focus();
			selectRef.current.onMenuOpen();
		}
	};

	const deleteFunction = (index: number) => {
		remove(index);
	};

	const notify = () => toast.error("Existem campos incompletos na tabela");

	useEffect(() => {
		if (errors.documents) {
			notify();
		}
	}, [errors.documents]);

	return (
		<div className="flex flex-col items-start">
			<button
				type="button"
				className="bg-[#0367c8] hover:bg-[#0353a4] p-2 rounded-md text-white text-sm mt-5 mb-3"
				onClick={() => {
					prepend({
						documentId: "",
						dueDate: "",
						issueDate: "",
					});
				}}
			>
				Adicionar documento
			</button>
			<div className="flex h-full w-full items-center justify-center">
				<Table
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
							<TableColumn className="bg-[#27272a] py-5 text-white" key={column.key}>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={items}>
						{items.map((item, index) => {
							const actualIndex = (page - 1) * rowsPerPage + index;
							return (
								<TableRow
									className={`${index % 2 === 1 ? "bg-gray-300" : "bg-white"} h-[40px] border-b border-gray-200`}
									key={item?.id}
								>
									<TableCell className="w-1/3 p-2" tabIndex={-1} onClick={handleSelectClick}>
										<Controller
											name={`documents.${actualIndex}.documentId`}
											control={control}
											render={({ field }) => (
												<Select
													{...field}
													options={documentsArray}
													className="bg-transparent"
													menuPosition="fixed"
													styles={{
														menuList: (provided) => ({
															...provided,
															maxHeight: "200px",
														}),
														dropdownIndicator: (provided) => ({
															...provided,
															padding: 4,
														}),
														indicatorSeparator: () => ({
															display: "none",
														}),
													}}
													value={documentsArray.find((option) => option.value === field.value)}
													onChange={(option) => field.onChange(option?.value)}
												/>
											)}
										/>
									</TableCell>
									<TableCell className="p-2">
										<Controller
											name={`documents.${actualIndex}.issueDate`}
											control={control}
											render={({ field }) => {
												return (
													<DatePicker
														value={field.value ? parseDate(field.value) : null}
														onChange={(date) => {
															const formattedDate = date?.toString();
															field.onChange(formattedDate);
														}}
													/>
												);
											}}
										/>
									</TableCell>
									<TableCell className="p-2">
										<Controller
											name={`documents.${actualIndex}.dueDate`}
											control={control}
											render={({ field }) => {
												return (
													<DatePicker
														value={field.value ? parseDate(field.value) : null}
														onChange={(date) => {
															const formattedDate = date?.toString();
															field.onChange(formattedDate);
														}}
													/>
												);
											}}
										/>
									</TableCell>
									<TableCell className="p-2">
										<div className="cursor-pointer">
											<DeleteDocument deleteFunction={() => deleteFunction(actualIndex)} />
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			<button
				type="submit"
				className="bg-[#0367c8] hover:bg-[#0353a4] p-2 w-[150px] rounded-md text-white text-sm text-center my-5"
			>
				Salvar
			</button>
		</div>
	);
}
