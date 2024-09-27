export interface httpRequest {
	url: string;
	method: "get" | "post" | "put" | "delete";
	params?: any;
	body?: any;
	headers?: any;
}

export interface httpResponse<T> {
	body: T;
	statusCode: number;
}

export interface httpClient<T = any> {
	request(data: httpRequest): Promise<httpResponse<T>>;
}
