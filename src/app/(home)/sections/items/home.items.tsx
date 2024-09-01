import ProductCard from "@/src/components/productCard";
import type { ICategory } from "@/src/types/ICategory";
import Link from "next/link";

interface IHomeItems {
	categories: ICategory[];
	slug: string;
}

export default function HomeItems({ categories, slug }: IHomeItems) {
	return (
		<div className="grid-style pt-[70px]">
			{categories?.map((category) => (
				<div key={category?.id}>
					<div className="flex justify-between">
						<div className="mb-5 font-bold text-3xl text-black">{category?.name}</div>
						<Link href={`${slug}/produto`} className="text-black/50 text-sm">
							VER TODOS
						</Link>
					</div>
					<div className="mb-20 grid grid-cols-1 xxl:grid-cols-4 gap-10 md:grid-cols-2 xl:grid-cols-3">
						{category?.products?.slice(0, 4).map((product) => (
							<ProductCard key={product?.id} slug={slug} product={product} />
						))}
					</div>
				</div>
			))}
		</div>
	);
}
