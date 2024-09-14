"use client";

import { axiosHttpAdapter, type httpClient } from "@/service";
import type { IDocuments } from "@/types/IDocuments";
import type { IEnterprise } from "@/types/IEnterprise";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormRegistercompany from "./form";
import RegisterCompaniesFormTable from "./formTable";

interface Props {
	documents: IDocuments[];
	enterPrise: IEnterprise;
}

const formSchema = z.object({
	name: z.string(),
	cnpj: z.string(),
	documents: z.array(
		z.object({
			id: z.string(),
			issueDate: z.string(),
			dueDate: z.string(),
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
			} else {
				await createEnterprise(axiosHttpAdapter, formattedData);
			}
			router.push("/empresas");
			router.refresh();
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
				{/* <div className="flex flex-col justify-between h-full"> */}
				<FormRegistercompany />
				<br />
				<RegisterCompaniesFormTable documents={documents} />
				{/* </div> */}
			</form>
		</FormProvider>
	);
}
