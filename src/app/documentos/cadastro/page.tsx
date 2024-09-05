"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default async function RegisterDocument() {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const createDocument = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: "/createDocument",
			method: "post",
			body: data,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			await createDocument(axiosHttpAdapter, data);
			router.push("/documentos");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Cadastro de documento</h1>
			</div>
			<div className="m-auto flex w-3/4 flex-col justify-center gap-6">
				<div>
					<label htmlFor="title" className="text-gray-700 text-smfont-medium">
						Titulo do documento
					</label>
					<input
						id="title"
						{...register("title")}
						type="text"
						placeholder="Nome do documento"
						className="w-full rounded-md border border-gray-300 p-3 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
					/>
				</div>
				<div>
					<label htmlFor="descrição" className="text-gray-700 text-smfont-medium">
						Descrição do documento
					</label>
					<textarea
						id="descrição"
						{...register("description")}
						placeholder="Descrição do documento"
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
