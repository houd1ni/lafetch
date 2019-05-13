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