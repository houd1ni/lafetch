import mergeDeepRight from 'ramda/src/mergeDeepRight'
import type from 'ramda/src/type'
import { formURI, addBase } from './utils'
import { Query, Config, OutMiddleware, InMiddleware, FetchData } from './types'
import { addHeaders, asyncpipe } from './helpers'

const default_config = {
  base: '/',
  json: true,
  headers: {},
  timeout: 1e4,
  middleware: {
    in: [],
    out: []
  }
}

export class Fetch {
  private config: Config
  private middleware = {
    in: [],
    out: [
      async (query: Query) => {
        query.url = formURI(query)
        return query
      },
      async (query: Query) => {
        query.url = addBase(this.config.base, query.url)
        return query
      },
      async (query: Query) => {
        if(type(query.body) == 'Object') {
          query = addHeaders({'Content-Type': 'application/json'}, query)
          query.body = JSON.stringify(query.body)
        }
        return query
      },
      async (query: Query) => {
        for(const name in query.headers) {
          if(type(query.headers[name]) == 'Null') {
            delete query.headers[name]
          }
        }
        return query
      }
    ]
  }
  private basic_query: Query
  private applyMiddleware: {
    in: InMiddleware
    out: OutMiddleware
  }
  public async query<T=any>(query: Partial<Query>): Promise<T> {
    query = await this.applyMiddleware.out(
      mergeDeepRight(this.basic_query, query)
    )
    if(query.result) {
      return query.result
    } else {
      const data: FetchData = {
        method: query.method,
        headers: query.headers
      }
      if(query.body) {
        data.body = query.body
      }
      return new Promise(async (ff, rj) => {
        let finished = false
        const to = setTimeout(() => {
          finished = true
          rj('timeout')
        }, query.timeout)
        const response = await fetch(query.url, data)
        if(!finished) {
          clearTimeout(to);
          ff(this.applyMiddleware.in(
            query.json ? await response.json() : response
          ))
        }
      })
    }
  }
  constructor(config: Partial<Config> = {}) {
    this.config = mergeDeepRight(default_config, config)
    this.basic_query = {
      url: '',
      method: 'get',
      headers: {},
      params: {},
      result: null,
      body: null,
      json: this.config.json,
      timeout: this.config.timeout,
      misc: {}
    }
    const middle = {} as { in: InMiddleware, out: OutMiddleware }
    ;['in', 'out'].forEach((direction: string) => {
      middle[direction] = asyncpipe(
        ...this.middleware[direction],
        ...this.config.middleware[direction]
      )
    })
    this.applyMiddleware = middle
  }
}