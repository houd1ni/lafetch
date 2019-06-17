
export interface AnyObject {
  [key: string]: any
}

export interface Headers {
  [name: string]: string | null
}

export type Method = 'get' | 'post' | 'put' | 'head' | 'delete' | 'options' | 'trace' | 'connect'

export type OutMiddleware = (query: Query) => Promise<Query>
export type InMiddleware = (data: any) => Promise<any>

export interface Config {
  base: string
  json: true
  headers: Headers
  timeout: number
  middleware: {
    in?: InMiddleware[],
    out?: OutMiddleware[]
  }
}

export interface Query {
  url: string
  method: Method
  /** Prevents query from going to server and returns this. */
  result: any
  /** querystring parameters. */
  params: {
    [name: string]: string | null
  }
  /** Request body. For POST requests in particular. */
  body: any
  headers: Headers
  json: boolean
  timeout: number
  misc: AnyObject
}

export interface FetchData {
  method: Method
  headers: Headers
  body?: any
}

export type AsyncFn = (...args: any[]) => Promise<any>