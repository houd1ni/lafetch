import mergeDeepRight from 'ramda/src/mergeDeepRight'
import { formURI, addBase, asyncpipe } from './utils'
import { Query, Headers } from './types'

interface Config {
  base: string
  json: true
  headers: Headers
  middleware: (
    (query: Query) => Promise<Query>
  )[]
}

const default_config = {
  base: '/',
  json: true,
  headers: {},
  middleware: []
}

export class Fetch {
  private config: Config
  private basic_middleware = [
    async (query: Query) => {
      query.url = formURI(query)
      return query
    },
    async (query: Query) => {
      query.url = addBase(this.config.base, query.url)
      return query
    }
  ]
  private basic_query = {
    url: '',
    method: 'get',
    headers: {},
    params: '',
    json: this.config.json
  }
  private applyMiddleware: (query: Query) => Promise<Query>
  public async query(query: Query) {
    query = await this.applyMiddleware(
      mergeDeepRight(this.basic_query, query)
    )
    if(query.result) {
      return query.result
    } else {
      const response = await fetch(query.url, {
        method: query.method,
        headers: query.headers
      })
      return query.json ? await response.json() : response
    }
  }
  constructor(config: Partial<Config>) {
    this.config = Object.assign({}, default_config, config)
    this.applyMiddleware = asyncpipe(
      ...this.config.middleware.concat(this.basic_middleware)
    )
  }
}