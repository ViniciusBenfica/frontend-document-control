import { url } from "../utils/url";
import type { httpClient, httpRequest } from "./dto.http.adapter";

export const fetchHttpAdapter: httpClient = {
	async request(data: httpRequest) {
		let fetchResponse: Response;

		try {
			fetchResponse = await fetch(`${url}${data.url}`, {
				method: data.method,
				body: data.body,
			});
		} catch (error) {
			const _error = error as Error;
			throw new Error(_error.message);
		}

		return {
			statusCode: fetchResponse.status,
			body: await fetchResponse.json(),
		};
	},
};
