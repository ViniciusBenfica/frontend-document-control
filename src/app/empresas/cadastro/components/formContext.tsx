"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import type { IEnterpriseOnDocument } from "@/types/IEnterpriseOnDocument";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormRegistercompany from "./form";
import RegisterCompaniesTable from "./table";

interface Props {
	enterpriseOnDocument: IEnterpriseOnDocument[];
	documents: IDocuments[];
}

const formSchema = z.object({
	name: z.string(),
	cnpj: z.string(),
	documents: z.array(
		z.object({
			documentTitle: z.string(),
			issueDate: z.string(),
			dueDate: z.string(),
			key: z.string(),
		}),
	),
});

export type FormValues = z.infer<typeof formSchema>;

export default function FormContextcompany({ enterpriseOnDocument, documents }: Props) {
	const router = useRouter();

	const methods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			documents: enterpriseOnDocument,
		},
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
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<button
					type="submit"
					className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Salvar
				</button>
				<FormRegistercompany />
				<RegisterCompaniesTable documents={documents} />
			</form>
		</FormProvider>
	);
}
