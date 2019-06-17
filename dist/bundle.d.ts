/// <reference types="node" />
/// <reference types="ramda" />

export interface AnyObject {
	[key: string]: any;
}
export interface Headers {
	[name: string]: string | null;
}
export declare type Method = 'get' | 'post' | 'put' | 'head' | 'delete' | 'options' | 'trace' | 'connect';
export declare type OutMiddleware = (query: Query) => Promise<Query>;
export declare type InMiddleware = (data: any) => Promise<any>;
export interface Config {
	base: string;
	json: true;
	headers: Headers;
	timeout: number;
	middleware: {
		in?: InMiddleware[];
		out?: OutMiddleware[];
	};
}
export interface Query {
	url: string;
	method: Method;
	/** Prevents query from going to server and returns this. */
	result: any;
	/** querystring parameters. */
	params: {
		[name: string]: string | null;
	};
	/** Request body. For POST requests in particular. */
	body: any;
	headers: Headers;
	json: boolean;
	timeout: number;
	misc: AnyObject;
}
export interface FetchData {
	method: Method;
	headers: Headers;
	body?: any;
}
export declare type AsyncFn = (...args: any[]) => Promise<any>;
/** Adds new headers to provided Query. */
export declare const addHeaders: Curry.Curry<(headers: Headers, query: Query) => Query>;
export declare const forEach: Curry.Curry<(fn: Function, items: any[]) => Promise<void>>;
export declare const forEachAsync: Curry.Curry<(fn: (item: any) => any, items: any[]) => Promise<any[]>>;
export declare const waitAll: (promises: Promise<any>[]) => Promise<any[]>;
export declare const explore: (...data: any[]) => any;
export declare const clearEmpty: <T = AnyObject>(o: T) => AnyObject;
export declare const mapKeys: Curry.Curry<(keyMap: {
	[oldKey: string]: string;
}, o: AnyObject) => any>;
export declare const asyncpipe: (...fns: Function[]) => (data: any) => Promise<any>;
export declare class Fetch {
	private config;
	private middleware;
	private basic_query;
	private applyMiddleware;
	query<T = any>(query: Partial<Query>): Promise<T>;
	constructor(config?: Partial<Config>);
}
export declare class Cached<T = any> {
	private cache;
	private proceccing;
	protected tryCache(key: string, fetchFn: () => Promise<T>): Promise<T>;
}
export interface Response {
	status: number;
}
declare abstract class FetchError {
	/** E.g. 5xx for internal server error. */
	private response;
	protected pattern: RegExp;
	protected name: string;
	readonly type: string;
	/** Checks is the response actually of this sort of Errors. */
	private is;
	protected try(): void;
	/** Throws itself in the case of the error of response. */
	constructor(response: Response);
}
export declare class AccessError extends FetchError {
	pattern: RegExp;
	name: string;
	constructor(response: Response);
}
export declare class ServerError extends FetchError {
	pattern: RegExp;
	name: string;
	constructor(response: Response);
}
export declare const formURI: (query: Partial<Query>) => string;

export {};
