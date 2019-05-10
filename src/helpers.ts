// Helpers to import to apps for easier work.

import { Query, Headers } from './types'

/** Adds new headers to provided Query. */
export const addHeaders = (query: Query, headers: Headers): Query => {
  return {
    ...query,
    headers: Object.assign({}, query.headers, headers)
  }
}