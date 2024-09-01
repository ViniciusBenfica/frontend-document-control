import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomeItems from "./home.items";

const mockCategories = [
	{
		id: "categoryId 1",
		name: "Category 1",
		serverId: "serverId",
		functionInGame: "functionInGame",
		products: [
			{
				id: "productId 1",
				name: "Product 1",
				gameItemName: "gameItemName",
				image: "image",
				price: 100,
				serverId: "serverId",
				categoryId: "categoryId",
				category: {
					id: "1",
					functionInGame: "functionInGame",
					name: "name",
				},
			},
			{
				id: "productId 2",
				name: "Product 2",
				gameItemName: "gameItemName",
				image: "image",
				price: 100,
				serverId: "serverId",
				categoryId: "categoryId",
				category: {
					id: "1",
					functionInGame: "functionInGame",
					name: "name",
				},
			},
		],
	},
	{
		id: "categoryId 3",
		name: "Category 2",
		serverId: "serverId",
		functionInGame: "functionInGame",
		products: [
			{
				id: "productId 3",
				name: "Product 2",
				gameItemName: "gameItemName",
				image: "image",
				price: 100,
				serverId: "serverId",
				categoryId: "categoryId",
				category: {
					id: "1",
					functionInGame: "functionInGame",
					name: "name",
				},
			},
		],
	},
];

describe("HomeItems", () => {
	afterEach(cleanup);

	it("renders without crashing", () => {
		render(<HomeItems categories={mockCategories} />);
	});

	it("displays category names", () => {
		render(<HomeItems categories={mockCategories} />);

		mockCategories.forEach((category) => {
			expect(screen.getByText(category.name)).toBeTruthy();
		});
	});

	it("contains link to view all products for each category", () => {
		render(<HomeItems categories={mockCategories} />);

		const links = screen.getAllByText("VER TODOS");
		expect(links.length).toBe(mockCategories.length);

		links.forEach((link) => {
			expect(link).toBeTruthy();

			const href = link.getAttribute("href");
			expect(href).toBe("/produto");
		});
	});
});
