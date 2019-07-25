
import { curry, type, join, replace } from 'ramda'
import { Query, HandleArrays } from './types'
import { reduce, compose, append } from 'ramda'

export const trim = curry((symbols: string, str: string) => {
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

const unshield: (a: string) => string = compose(replace(/&/g, '\\&'), String)

const stringifyPair = (
  handleArrays: HandleArrays,
  key: string,
  value: any
): string => {
  switch(type(value)) {
    case 'Array':
      switch(handleArrays) {
        case '[]':
          return compose(
            join('&'),
            reduce(
              (accum, cur) => append(
                stringifyPair(handleArrays, `${key}[]`, cur), accum
              ), []
            )
          )(value)
        case ',':
          return compose(
            join(','),
            reduce(
              (accum, val) => append(unshield(val as string), accum),
              []
            )
          )(value)
      }
    default:
      return `${key}=${unshield(value)}`
  }
  
}

/** Turns query params into query string. */
export const formURI = (query: Partial<Query>) => {
  const parts: string[] = []
  if(query.params) {
    const params_part: string[] = []
    Object.entries(query.params).forEach(([name, param]) => {
      if(param != undefined) {
        params_part.push(stringifyPair(query.handleArrays || '[]', name, param))
      }
    })
    if(params_part.length) {
      parts.push(`?${params_part.join('&')}`)
    }
  }
  return encodeURI((query.url || '') + parts.map(trim('-')).join('/'))
}

const trimSlash = trim('/')
export const addBase = (base: string, url: string) => {
  if(!url.includes('://') && !url.startsWith(base)) {
    return trimSlash(base) + '/' + trimSlash(url)
  } else {
    return url
  }
}

export const hole = <T=any>(a: T) => a as T