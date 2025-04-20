"use client";

import { Input } from "@heroui/input";
import { useFormContext } from "react-hook-form";
import type { FormValues } from "./formContext";

export default function FormRegistercompany() {
	const {
		register,
		setValue,
		formState: { errors },
		trigger,
	} = useFormContext<FormValues>();

	const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, "");

		if (value.length > 14) return;

		value = value.replace(/^(\d{2})(\d)/, "$1.$2");
		value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
		value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
		value = value.replace(/(\d{4})(\d)/, "$1-$2");

		setValue("cnpj", value);
		trigger("cnpj");
	};

	return (
		<div className="flex w-full flex-col">
			<div className="flex w-3/4 flex-col justify-center gap-2">
				<div>
					<label htmlFor="name" className="text-[#020817f6] font-bold text-sm">
						Nome da empresa
					</label>
					<Input
						type="text"
						{...register("name")}
						variant="bordered"
						placeholder="Digite o nome da empresa"
						isInvalid={!!errors?.name}
						errorMessage={errors?.name?.message}
						className="w-full mt-1"
					/>
				</div>
				<div>
					<label htmlFor="cnpj" className="text-[#020817f6] font-bold text-sm">
						CNPJ
					</label>
					<Input
						type="text"
						{...register("cnpj")}
						variant="bordered"
						placeholder="Digite o CNPJ da empresa"
						onChange={handleCnpjChange}
						isInvalid={!!errors?.cnpj}
						errorMessage={errors?.cnpj?.message}
						className="w-full mt-1"
					/>
				</div>
			</div>
		</div>
	);
}
