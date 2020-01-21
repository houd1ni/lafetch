import { AnyFunc } from 'pepka';

export interface AnyObject {
	[key: string]: any;
}
export declare type Credentials = 'omit' | 'same-origin' | 'include';
export interface Headers {
	[name: string]: string | null;
}
export declare type Method = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'trace' | 'connect';
export declare type HandleArrays = '[]' | ',';
export declare type Encoding = 'json' | 'url' | 'multipart';
export declare type OutMiddleware = (query: Query) => Promise<Query>;
export declare type InMiddleware = ({ query: Query, response: any }: {
	query: any;
	response: any;
}) => Promise<{
	query: Query;
	response: any;
}>;
export interface Config {
	base: string;
	json: boolean;
	headers: Headers;
	timeout: number;
	credentials: Credentials;
	throwCodes: RegExp;
	handleArrays: HandleArrays;
	encoding: Encoding;
	adapter: (url: string, conf: AnyObject) => Promise<AnyObject> | null;
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
		[name: string]: any;
	};
	/** Request body. For POST requests in particular. */
	body: any;
	encoding: Encoding;
	headers: Headers;
	credentials: Credentials;
	throwCodes?: RegExp;
	json: boolean;
	timeout: number;
	misc: AnyObject;
	handleArrays: HandleArrays;
}
export interface FetchData {
	method: Method;
	headers: Headers;
	body?: any;
	credentials?: Credentials;
}
export declare type AsyncFn = (...args: any[]) => Promise<any>;
/** Adds new headers to provided Query. */
export declare const addHeaders: (...args: any[]) => any;
export declare const forEach: (...args: any[]) => any;
export declare const forEachAsync: (...args: any[]) => any;
export declare const waitAll: (promises: Promise<any>[]) => Promise<any[]>;
export declare const mapKeys: (...args: any[]) => any;
export declare const asyncpipe: <T = any>(...fns: import("pepka").AnyFunc[]) => (data?: any) => Promise<T>;
export declare const explore: any;
export declare const clearEmpty: any;
export declare const bind: (obj: AnyObject, methodName: string) => (...args: any[]) => any;
export interface CookieData {
	name: string;
	value: any;
	attrs: AnyObject;
}
export declare class Cookie {
	private data;
	parse(str: string): CookieData;
	get(): CookieData;
	set(v: any): void;
	stringify(): any;
	toString(): any;
	constructor(str?: string);
}
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
	protected tryCacheWhen<P = T>(key: string, cacheIf: (data: any) => boolean, fetchFn: () => Promise<P>): Promise<P>;
	protected tryCache<P = T>(key: string, fetchFn: () => Promise<P>): Promise<P>;
	protected dropCache(key?: string): void;
}
export interface Response {
	status: number;
}
declare abstract class FetchError {
	/** E.g. 5xx for internal server error. */
	private response;
	protected pattern: RegExp;
	protected name: string;
	get type(): string;
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
/** Turns query params into query string. */
export declare const formURI: (query: Partial<Query>) => string;

export {};
