"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
	title: z.string().min(1, "O título deve ter no mínimo 1 caractere"),
	description: z.string().min(1, "O título deve ter no mínimo 1 caractere"),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
	document: IDocuments;
}

export default function DocumentForm({ document }: Props) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
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
			url: `/updateDocument/${document.id}`,
			method: "put",
			body: data,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		try {
			if (document.id) {
				await updateDocument(axiosHttpAdapter, data);
				toast.success("Documento atualizado com sucesso");
			} else {
				await createDocument(axiosHttpAdapter, data);
				toast.success("Documento criado com sucesso");
			}
			router.push("/documentos");
			router.refresh();
		} catch (error) {
			toast.error("Erro ao tentar criar o documento");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
			<button
				type="submit"
				className="w-[150px] rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
			>
				Salvar
			</button>
			<br />
			<div className="flex w-3/4 flex-col justify-center gap-2">
				<div>
					<label htmlFor="title" className="text-gray-700 text-smfont-medium">
						Titulo do documento
					</label>
					<Input
						type="text"
						{...register("title")}
						variant="bordered"
						isInvalid={!!errors?.title}
						errorMessage={errors?.title?.message}
						className="w-full"
					/>
				</div>
				<div>
					<label htmlFor="descrição" className="text-gray-700 text-smfont-medium">
						Descrição do documento
					</label>
					<Textarea
						id="descrição"
						{...register("description")}
						variant="bordered"
						isInvalid={!!errors?.description}
						errorMessage={errors?.description?.message}
					/>
				</div>
			</div>
		</form>
	);
}
