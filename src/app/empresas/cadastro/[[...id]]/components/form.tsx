"use client";

import { useFormContext } from "react-hook-form";
import type { FormValues } from "./formContext";

export default function FormRegistercompany() {
	const { register } = useFormContext<FormValues>();

	return (
		<div className="flex w-full flex-col">
			<div className="flex w-3/4 flex-col justify-center gap-2">
				<div>
					<label htmlFor="name" className="text-gray-700 text-smfont-medium">
						Nome da empresa
					</label>
					<input
						id="name"
						{...register("name")}
						type="text"
						placeholder="Nome da empresa"
						className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
					/>
				</div>
				<div>
					<label htmlFor="cnpj" className="text-gray-700 text-smfont-medium">
						CNPJ
					</label>
					<input
						id="cnpj"
						{...register("cnpj")}
						type="text"
						placeholder="CNPJ"
						className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
					/>
				</div>
			</div>
		</div>
	);
}
