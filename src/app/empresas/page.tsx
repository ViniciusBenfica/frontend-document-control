import { enterpriseMapper } from "@/mappers/enterpriseMapper";
import Link from "next/link";
import PlusIcon from "/public/icon/plus.svg";
import { fetchHttpAdapter, type httpClient } from "../../service";
import type { IEnterpriseApi } from "../../types/IEnterprise";
import CompaniesTable from "./cadastro/components/table";

async function getAllCompanies(httpClient: httpClient<IEnterpriseApi[]>) {
	try {
		const data = await httpClient.request({
			url: "/findAllEnterprise",
			method: "get",
		});

		const result = data.body.map((item) => enterpriseMapper(item));
		return {
			status: data.statusCode,
			body: result,
		};
	} catch (error) {
		console.log(error);
		return {
			status: 500,
			body: [],
		};
	}
}
export default async function Companies() {
	const categories = await getAllCompanies(fetchHttpAdapter);

	return (
		<main className="flex w-full flex-col p-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-extrabold tracking-tight text-[#020817f6]">Empresas</h1>
					<p className="text-[#64748b] text-sm">
						Gerencie as empresas e seus documentos associados.
					</p>
				</div>
				<Link href="/empresas/cadastro">
					<button
						type="button"
						className="bg-[#0367c8] hover:bg-[#0353a4] p-2 rounded-md text-white text-sm flex items-center gap-2"
					>
						<PlusIcon />
						Nova Empresa
					</button>
				</Link>
			</div>

			<div className="m-auto w-full items-center justify-center">
				<CompaniesTable rows={categories.body} />
			</div>
		</main>
	);
}
