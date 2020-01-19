// Helpers to import to apps for easier work.
import {
  curry, complement, pickBy, isEmpty,
  fromPairs, toPairs, compose, map, filter, isNil,
  tap, bind as pbind
} from 'pepka'
import { Query, Headers, AnyObject, AnyFunc } from './types'
import { parseCookie, stringifyCookie } from './utils'

/** Adds new headers to provided Query. */
export const addHeaders = curry((headers: Headers, query: Query): Query => {
  return {
    ...query,
    headers: { ...query.headers, ...headers }
  }
})

export const forEach = (() => {
  const pipe = async (fn: AnyFunc, items: any[], i: number) => {
    if(i<items.length) {
      await fn(items[i])
      await pipe(fn, items, ++i)
    }
  }
  return curry(
    (fn: AnyFunc, items: any[]) => pipe(fn, items, 0)
  )
})()

export const forEachAsync = curry(
  (fn: (item: any) => Promise<any>, items: any[]) =>
    Promise.all(items.map(fn))
)

export const waitAll = (promises: Promise<any>[]) => Promise.all(promises)
export const explore = tap(pbind(console.log, console))
export const clearEmpty: <T = AnyObject>(o: T) => AnyObject =
  compose(pickBy, complement)(isEmpty)
export const bind = (obj: AnyObject, methodName: string) =>
  curry(obj[methodName].bind(obj))

export const mapKeys = curry((
  keyMap: {[oldKey: string]: string},
  o: AnyObject
) => (compose(
  fromPairs,
  filter(complement(isNil)),
  map(
    (([k, v]: [string, any]) =>
      keyMap[k]===null
      ? null
      : [keyMap[k] || k, v] as any
    )
  ),
  toPairs as any
) as any)(o))

export const asyncpipe = (() => {
  const pipe = async (fns: AnyFunc[], data: any, i: number): Promise<any> =>
    ~i ? await pipe(fns, await fns[i](data), --i) : data
  return (...fns: AnyFunc[]) => (data?: any) => pipe(fns, data, fns.length-1)
})()

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