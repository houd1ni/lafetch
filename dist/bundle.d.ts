/// <reference types="node" />
/// <reference types="ramda" />

export interface AnyObject {
	[key: string]: any;
}
export interface Headers {
	[name: string]: string;
}
export interface Query {
	url: string;
	method: 'get' | 'post' | 'put' | 'head' | 'delete' | 'options' | 'trace' | 'connect';
	/** Prevents query from going to server and returns this. */
	result?: any;
	/** querystring parameters. */
	params?: {
		[name: string]: string | null;
	};
	headers?: Headers;
	json?: boolean;
}
export interface Config {
	base: string;
	json: true;
	headers: Headers;
	middleware: ((query: Query) => Promise<Query>)[];
}
export declare class Fetch {
	private config;
	private basic_middleware;
	private basic_query;
	private applyMiddleware;
	query<T = any>(query: Query): Promise<T>;
	constructor(config: Partial<Config>);
}
/** Adds new headers to provided Query. */
export declare const addHeaders: Curry.Curry<(headers: Headers, query: Query) => Query>;
export declare const forEach: Curry.Curry<(fn: Function, items: any[]) => Promise<void>>;
export declare const forEachAsync: Curry.Curry<(fn: (item: any) => any, items: any[]) => Promise<any[]>>;
export declare const formURI: (query: Query) => string;

export {};
