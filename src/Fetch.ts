import { type, mergeDeep, compose, assoc, clone } from 'pepka'
import { formURI, addBase, hole, removeAllProps } from './utils'
import { Query, Config, OutMiddleware, InMiddleware, FetchData } from './types'
import { addHeaders, asyncpipe } from './helpers'

const default_config: Config = {
  base: '/',
  json: true,
  headers: {},
  timeout: 1e4,
  adapter: (url: string, conf: any) => fetch(url, conf),
  throwCodes: /\n/, // doesn't throw.
  credentials: 'same-origin',
  handleArrays: '[]',
  encoding: 'json',
  middleware: {
    in: [],
    out: []
  }
}

const finalTransform = (dir: 'in' | 'out') => {
  return dir=='out'
    ? hole
    : async ({ query, response }) =>
        query.json ? await response.json() : response
}

export class Fetch {
  private config: Config
  private middleware = {
    in: [],
    out: [
      async (query: Query) => {
        query.url = formURI(query)
        removeAllProps(query.params)
        return query
      },
      async (query: Query) => {
        query.url = addBase(this.config.base, query.url)
        return query
      },
      async (query: Query) => {
        if(type(query.body) == 'Object') {
          const ct = 'Content-Type'
          switch(query.encoding) {
            case 'json':
              return (compose as any)(
                addHeaders({[ct]: 'application/json'}),
                assoc('body', JSON.stringify(query.body))
              )(query)
            case 'url':
              return (compose as any)(
                addHeaders({[ct]: 'application/x-www-form-urlencoded'}),
                assoc('body', formURI({ params: query.body }).slice(1))
              )(query)
            case 'multipart':
              console.warn('lafetch: multipart encoding is not implemented yet.')
            default:
              // TODO:
              return query
          }
        } else {
          return query
        }
      },
      async (query: Query) => {
        for(const name in query.headers) {
          if(type(query.headers[name]) == 'Null') {
            delete query.headers[name]
          }
        }
        return query
      },
      async (query: Query) => clone(query)
    ]
  }
  private basic_query: Query
  private applyMiddleware: {
    in: InMiddleware
    out: OutMiddleware
  }
  public async query<T=any>(query: Partial<Query>): Promise<T> {
    query = await this.applyMiddleware.out(
      mergeDeep(this.basic_query, query) as Query
    )
    if(query.result) {
      return query.result
    } else {
      const data: FetchData = {
        method: query.method,
        headers: query.headers,
        credentials: query.credentials
      }
      if(query.body) {
        data.body = query.body
      }
      return new Promise(async (ff, rj) => {
        let stuck = false
        const to = setTimeout(() => {
          stuck = true
          rj('timeout')
        }, query.timeout)
        try {
          const response = await this.config.adapter(query.url, data)
          if(!stuck) {
            clearTimeout(to)
            if(query.throwCodes.test(String(response.status))) {
              rj(response.status)
            } else {
              ff((await this.applyMiddleware.in(
                { query, response }
              )) as unknown as T) // this should be done by finalTransform.
            }
          }
        } catch(e) {
          clearTimeout(to)
          rj(e)
        }
      })
    }
  }
  constructor(config: Partial<Config> = {}) {
    this.config = mergeDeep(default_config, config) as Config
    this.basic_query = {
      url: '',
      method: 'get',
      headers: {},
      params: {},
      result: null,
      body: null,
      json: this.config.json,
      timeout: this.config.timeout,
      credentials: this.config.credentials,
      throwCodes: this.config.throwCodes,
      handleArrays: this.config.handleArrays,
      encoding: this.config.encoding,
      misc: {}
    }
    const middle = {} as { in: InMiddleware, out: OutMiddleware }
    for(const dir of ['in', 'out']) {
      middle[dir] = asyncpipe(
        finalTransform(dir as ('in' | 'out')),
        ...this.middleware[dir],
        ...this.config.middleware[dir]
      )
    }
    this.applyMiddleware = middle
  }
}