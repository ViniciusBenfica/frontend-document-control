import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { httpClient, httpRequest } from "./dto.http.adapter";

export const axiosHttpAdapter: httpClient = {
	async request(data: httpRequest) {
		let axiosResponse: AxiosResponse;

		try {
			axiosResponse = await axios.request({
				baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
				url: data.url,
				method: data.method,
				data: data.body,
			});
		} catch (error) {
			const _error = error as AxiosError<{ message: string }>;
			throw new Error(_error?.response?.data?.message || _error.message);
		}

		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data,
		};
	},
};
