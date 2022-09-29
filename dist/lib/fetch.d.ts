interface CustomResponse {
    status: 200 | 400;
    json: () => Promise<Object>;
}
interface CustomFetchOptions {
    headers: HeadersInit;
    method: string;
    body: string;
}
declare function fetch(url: URL | string, options?: Partial<CustomFetchOptions>): Promise<CustomResponse>;
export default fetch;
