"use client";

import DeleteDocument from "@/components/deleteModal";
import type { IDocuments } from "@/types/IDocuments";
import { parseDate } from "@internationalized/date";
import { DatePicker, Pagination } from "@nextui-org/react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
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
	const { fields, append, remove } = useFieldArray({
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
				className="w-[150px] rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				onClick={() => {
					append({
						documentId: "",
						dueDate: "",
						issueDate: "",
					});
				}}
			>
				Adicionar
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
							<TableColumn className="bg-[#27272a] p-5 text-white" key={column.key}>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={items}>
						{items.map((item, index) => {
							const actualIndex = (page - 1) * rowsPerPage + index;
							return (
								<TableRow
									className={`${index % 2 === 1 ? "bg-gray-300" : "bg-slate-400"}`}
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
															const formattedDate = date.toString();
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
															const formattedDate = date.toString();
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
		</div>
	);
}
