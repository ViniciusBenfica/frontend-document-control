"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string(),
	cnpj: z.string(),
	// cnpj: z.string().refine(isValidCNPJ, { message: "CNPJ inválido" }),
});

type FormValues = z.infer<typeof formSchema>;

export default async function RegisterCompanies() {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const createCompanie = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: "/createEnterprise",
			method: "post",
			body: data,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			await createCompanie(axiosHttpAdapter, data);
			router.push("/documentos");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Cadastro de empresas</h1>
			</div>
			<div className="m-auto flex w-3/4 flex-col justify-center gap-6">
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
						placeholder="cnpj"
						className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
					/>
				</div>
				<button
					type="submit"
					className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Salvar
				</button>
			</div>
		</form>
	);
}
