// Helpers to import to apps for easier work.
import {
  curry, isEmpty, explore as pexplore, waitAll as pwaitAll, composeAsync,
  mapKeys as pmapKeys, forEachSerial, forEachAsync as pforEachAsync, filter
} from 'pepka'
import { Query, Headers, AnyObject } from './types'
import { parseCookie, stringifyCookie } from './utils'

/** Adds new headers to provided Query. */
export const addHeaders = curry((headers: Headers, query: Query): Query => {
  return {
    ...query,
    headers: { ...query.headers, ...headers }
  }
})

export const forEach = forEachSerial
export const forEachAsync = pforEachAsync
export const waitAll = pwaitAll
export const mapKeys = pmapKeys
export const asyncpipe = composeAsync
export const explore = pexplore('_')
export const clearEmpty = filter(isEmpty)
export const bind = (obj: AnyObject, methodName: string) =>
  curry(obj[methodName].bind(obj))

interface CookieData {
  name: string,
  value: any,
  attrs: AnyObject
}

export class Cookie {
  private data: CookieData = null
  public parse(str: string) {
    this.data = parseCookie(str)
    return this.get()
  }
  public get() {
    return this.data
  }
  public set(v: any) {
    this.data.value = v
  }
  public stringify() {
    return stringifyCookie(this.data)
  }
  public toString() {
    return this.stringify()
  }
  constructor(str?: string) {
    if(str) {
      this.parse(str)
    } else {
      this.data = { name: '', value: null, attrs: {} }
    }
  }
}