import TableComponent from "@/components/table";
import { enterpriseMapper } from "@/mappers/enterpriseMapper";
import Link from "next/link";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseApi } from "../../types/IEnterprise";

async function getAllCompanies(httpClient: httpClient<IEnterpriseApi[]>) {
	const data = await httpClient.request({
		url: "/findAllEnterprise",
		method: "get",
	});

	const result = data.body.map((item) => enterpriseMapper(item));
	return {
		status: data.statusCode,
		body: result,
	};
}

export default async function Companies() {
	const categories = await getAllCompanies(fetchHttpAdapter);

	const columns = [
		{
			key: "name",
			label: "Nome",
		},
		{
			key: "cnpj",
			label: "CNPJ",
		},
	];

	return (
		<main className="flex w-full flex-col">
			<div className="mt-5 ml-6 flex flex-col gap-3">
				<h1 className="font-bold text-3xl text-gray-700">Controle de empresas</h1>
				<Link
					href="/empresas/cadastro"
					className="w-auto self-start rounded-lg bg-slate-300 p-2 font-semibold duration-100 hover:bg-gray-400"
				>
					Cadastrar empresa
				</Link>
			</div>
			<div className="m-auto flex w-3/4 items-center justify-center">
				<TableComponent rows={categories.body} columns={columns} />
			</div>
		</main>
	);
}
