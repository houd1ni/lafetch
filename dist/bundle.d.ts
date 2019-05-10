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
	query(query: Query): Promise<any>;
	constructor(config: Partial<Config>);
}
/** Adds new headers to provided Query. */
export declare const addHeaders: (query: Query, headers: Headers) => Query;

export {};
