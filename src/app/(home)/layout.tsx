export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex">
			<div className="h-screen w-[150px] shadow-black/65 shadow-xl">
				<nav>
					<ul>
						<li className="flex h-[50px] w-ful items-center justify-center transition-colors duration-50 hover:bg-green-700 hover:text-white">
							Empresas
						</li>
						<li className="flex h-[50px] w-ful items-center justify-center transition-colors duration-50 hover:bg-green-700 hover:text-white">
							Documentos
						</li>
					</ul>
				</nav>
			</div>
			{children}
		</section>
	);
}
