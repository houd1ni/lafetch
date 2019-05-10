
export interface AnyObject {
  [key: string]: any
}

export interface Headers {
  [name: string]: string
}

export interface Query {
  url: string
  method: 'get' | 'post' | 'put' | 'head' | 'delete' | 'options' | 'trace' | 'connect'
  /** Prevents query from going to server and returns this. */
  result?: any
  /** querystring parameters. */
  params?: {
    [name: string]: string | null
  }
  headers?: Headers
  json?: boolean
}