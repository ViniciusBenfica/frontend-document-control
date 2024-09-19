"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import type { IEnterprise } from "@/types/IEnterprise";
import { isValidCNPJ } from "@/utils/cnpjValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import FormRegistercompany from "./form";
import RegisterCompaniesFormTable from "./formTable";

interface Props {
	documents: IDocuments[];
	enterPrise: IEnterprise;
}

const formSchema = z.object({
	name: z.string().min(1, "Nome da empresa é obrigatório"),
	cnpj: z.string().refine(isValidCNPJ, { message: "CNPJ inválido" }),
	documents: z.array(
		z.object({
			id: z.string().min(1, "Nome da empresa é obrigatório"),
			issueDate: z.string().min(1, "Nome da empresa é obrigatório"),
			dueDate: z.string().min(1, "Nome da empresa é obrigatório"),
		}),
	),
});

export type FormValues = z.infer<typeof formSchema>;

export default function FormContextEnterprise({ documents, enterPrise }: Props) {
	const router = useRouter();

	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: enterPrise?.name,
			cnpj: enterPrise?.cnpj,
			documents: enterPrise?.documents?.map((doc) => ({
				id: doc?.documentId,
				issueDate: doc?.issueDate,
				dueDate: doc?.dueDate,
			})),
		},
	});

	const createEnterprise = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: "/createEnterprise",
			method: "post",
			body: data,
		});
	};

	const updateEnterprise = async (httpClient: httpClient, data: FormValues) => {
		await httpClient.request({
			url: `/updateEnterprise/${enterPrise.id}`,
			method: "put",
			body: data,
		});
	};

	const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
		const formattedData = {
			name: data.name,
			cnpj: data.cnpj,
			documents: data.documents.map((doc) => ({
				...doc,
				issueDate: new Date(doc.issueDate).toISOString(),
				dueDate: new Date(doc.dueDate).toISOString(),
			})),
		};

		try {
			if (enterPrise.id) {
				await updateEnterprise(axiosHttpAdapter, formattedData);
				toast.success("Empresa atualizada com sucesso");
			} else {
				await createEnterprise(axiosHttpAdapter, formattedData);
				toast.success("Empresa criada com sucesso");
			}
			router.push("/empresas");
			router.refresh();
		} catch (error) {
			toast.error("Erro ao tentar criar a empresa");
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<button
					type="submit"
					className="w-[150px] self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Salvar
				</button>
				<br />
				<br />
				<FormRegistercompany />
				<br />
				<RegisterCompaniesFormTable documents={documents} />
			</form>
		</FormProvider>
	);
}
