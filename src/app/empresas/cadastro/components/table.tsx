"use client";

import type { IDocuments } from "@/types/IDocuments";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { useRef } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Select, { type SelectInstance } from "react-select";
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
];

interface IProps {
	documents: IDocuments[];
}

export default function RegisterCompaniesTable({ documents }: IProps) {
	const { control, register } = useFormContext<FormValues>();
	const documentsArray = documents.map((doc) => ({ label: doc.title, value: doc.key }));
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control,
		name: "documents",
	});

	const selectRef = useRef<SelectInstance>(null);

	const handleSelectClick = () => {
		if (selectRef.current) {
			selectRef.current.focus();
			selectRef.current.onMenuOpen();
		}
	};
	return (
		<div>
			<button
				type="button"
				className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				onClick={() =>
					append({
						documentTitle: "",
						dueDate: "",
						issueDate: "",
						key: "",
					})
				}
			>
				Adicionar
			</button>
			<div className="flex h-full w-full items-center justify-center">
				<Table>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn className="bg-[#27272a] p-5 text-white" key={column.key}>
								{column.label}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={fields}>
						{fields.map((item, index) => (
							<TableRow
								className={`${index % 2 === 1 ? "bg-gray-300" : "bg-slate-400"}`}
								key={item.id}
							>
								<TableCell className="w-1/3 p-2" tabIndex={-1} onClick={handleSelectClick}>
									<Controller
										name={`documents.${index}.documentTitle`}
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												options={documentsArray}
												className="bg-transparent"
												styles={{
													menuList: (provided) => ({
														...provided,
														maxHeight: "100px",
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
									<input
										type="date"
										{...register(`documents.${index}.issueDate`)}
										className="h-full w-full bg-transparent p-3 focus:outline-none"
									/>
								</TableCell>
								<TableCell className="p-2">
									<input
										type="date"
										{...register(`documents.${index}.dueDate`)}
										className="h-full w-full bg-transparent p-3 focus:outline-none"
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
