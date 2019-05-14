// Helpers to import to apps for easier work.

import curry from 'ramda/src/curry'
import { Query, Headers } from './types'

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