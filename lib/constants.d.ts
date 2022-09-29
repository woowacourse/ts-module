export declare type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export declare type Options = {
    method?: Method;
    headers?: {
        "Content-Type": "application/json";
    };
    body?: any;
};
