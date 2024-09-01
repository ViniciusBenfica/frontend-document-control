import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeBanner from "./home.banner";

describe("HomeBanner", () => {
	it("should render the banner with correct attributes", () => {
		render(<HomeBanner />);

		const bannerImage = screen.getByAltText("banner") as HTMLImageElement;

		expect(bannerImage).toBeTruthy();

		expect(bannerImage.width).toBe(1920);
		expect(bannerImage.height).toBe(400);
	});
});
