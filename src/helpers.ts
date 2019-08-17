// Helpers to import to apps for easier work.
import {
  curry, complement, pickBy, unary, isEmpty,
  fromPairs, toPairs, compose, map, filter, isNil,
  tap, bind as rbind
} from 'ramda'
import { Query, Headers, AnyObject } from './types'

/** Adds new headers to provided Query. */
export const addHeaders = curry((headers: Headers, query: Query): Query => {
  return {
    ...query,
    headers: Object.assign({}, query.headers, headers)
  }
})

export const forEach = (() => {
  const pipe = async (fn: Function, items: any[], i: number) => {
    if(i<items.length) {
      await fn(items[i])
      await pipe(fn, items, ++i)
    }
  }
  return curry(
    (fn: Function, items: any[]) => pipe(fn, items, 0)
  )
})()

export const forEachAsync = curry(
  (fn: (item: any) => any, items: any[]) =>
    Promise.all(items.map(fn))
)

export const waitAll = (promises: Promise<any>[]) => Promise.all(promises)
export const explore = tap(rbind(console.log, console))
export const clearEmpty: <T = AnyObject>(o: T) => AnyObject =
  pickBy(unary(complement(isEmpty)))
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
  const pipe = async (fns: Function[], data: any, i: number): Promise<any> =>
    ~i ? await pipe(fns, await fns[i](data), --i) : data
  return (...fns: Function[]) => (data?: any) => pipe(fns, data, fns.length-1)
})()