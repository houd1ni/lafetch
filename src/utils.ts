
import {
  curry, type, join, replace, reduce, compose, toPairs,
  append, fromPairs, map, split, equals, not, filter
} from 'pepka'
import { Query, HandleArrays, AnyObject } from './types'

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
          return `${key}=` + compose(
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

export const splitOnce = curry((delimiter: RegExp, s: string) => {
  const i = s.search(delimiter)
  return ~i ? [ s.slice(0, i), s.slice(i+1) ] : [ s ]
})

export const parseCookie = compose(
  ([[k, v], ...attrs]) => ({
    name: k,
    value: v,
    attrs: (equals(attrs, [null]) ? {} : fromPairs(attrs))
  }),
  map(compose(
    ([key, value]) =>  key
      ? [key, value ? decodeURIComponent(value) : true]
      : null,
    splitOnce(/=/)
  )),
  split(/; ?/g)
)

export const stringifyCookie = (compose as any)(
  join('; '),
  filter(compose(not, equals('Null'), type)),
  map((([k, v]) => v === null ? null : (v===true ? k : `${k}=${v}`))),
  ({ name, value, attrs }) => [ [name, value], ...toPairs(attrs) ]
)

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

export const removeAllProps = (o: AnyObject) => {
  for(let k in o) {
    delete o[k]
  }
  return o
}