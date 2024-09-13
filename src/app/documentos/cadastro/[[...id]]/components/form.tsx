"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
	document: IDocuments;
}

export default function DocumentForm({ document }: Props) {
	const router = useRouter();
	const { register, handleSubmit } = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: document.title,
			description: document.description,
		},
	});

	const createDocument = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: "/createDocument",
			method: "post",
			body: data,
		});
	};

	const updateDocument = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: `/updateDocument/${document.key}`,
			method: "put",
			body: data,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			if (document.key) {
				await updateDocument(axiosHttpAdapter, data);
			} else {
				await createDocument(axiosHttpAdapter, data);
			}
			router.push("/documentos");
			router.refresh();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
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
