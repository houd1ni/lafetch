
import curry from 'ramda/src/curry'
import { Query } from './types'

const trim = curry((symbols: string, str: string) => {
  let found_first = null,
      found_last = null,
      symbol: string
  for(let i=0; i<str.length; i++) {
    symbol = str[i]
    if(!symbols.includes(symbol)) {
      if(found_first==null) {
        found_first = i
      }
      found_last = null
    } else {
      if(found_first) {
        found_last = i
      }
    }
  }
  return str.slice(
    found_first || 0,
    found_last || str.length
  )
})

export const asyncpipe = (() => {
  const pipe = async (fns: Function[], data: any, i: number): Promise<any> =>
    ~i ? await pipe(fns, await fns[i](data), --i) : data
  return (...fns: Function[]) => (data: any) => pipe(fns, data, fns.length-1)
})()

// Turns query params into query string.
export const formURI = (query: Query) => {
  const parts: string[] = []
  if(query.params) {
    const params_part: string[] = []
    Object.entries(query.params).forEach(([name, param]) => {
      if(param != undefined) {
        param = String(param)
        params_part.push(`${name}=${param.replace(/&/g, '\\&')}`)
      }
    })
    if(params_part.length) {
      parts.push(`?${params_part.join('&')}`)
    }
  }
  return encodeURI(query.url + parts.map(trim('-')).join('/'))
}

const trimSlash = trim('/')
export const addBase = (base: string, url: string) => {
  if(!url.includes('://') && !url.startsWith(base)) {
    return trimSlash(base) + '/' + trimSlash(url)
  } else {
    return url
  }
}