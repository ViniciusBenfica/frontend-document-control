"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import { Input, Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
			title: document?.title,
			description: document?.description,
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
			if (document?.id) {
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
			<br />
			<div className="flex w-2/4 flex-col justify-center gap-2">
				<div>
					<label htmlFor="title" className="text-[#020817f6] font-bold text-sm">
						Titulo
					</label>
					<Input
						type="text"
						{...register("title")}
						variant="bordered"
						placeholder="Digite o título do documento"
						isInvalid={!!errors?.title}
						errorMessage={errors?.title?.message}
						className="w-full mt-1"
					/>
				</div>
				<div>
					<label htmlFor="descrição" className="text-[#020817f6] font-bold text-sm">
						Descrição
					</label>
					<Textarea
						id="descrição"
						placeholder="Digite a descrição do documento"
						{...register("description")}
						variant="bordered"
						className="mt-1"
						isInvalid={!!errors?.description}
						errorMessage={errors?.description?.message}
					/>
				</div>
			</div>
			<br />
			<div className="flex gap-2 w-[300px]">
				<Link
					href="/documentos"
					className="bg-[#c80303] hover:bg-[#a40303] p-2 rounded-md text-white text-sm w-full text-center"
				>
					Cancelar
				</Link>
				<button
					type="submit"
					className="bg-[#0367c8] hover:bg-[#0353a4] p-2 rounded-md text-white text-sm w-full"
				>
					Salvar
				</button>
			</div>
		</form>
	);
}
