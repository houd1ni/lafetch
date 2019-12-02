# lafetch
Very light modular replacement for libs like axios, based on the fetch API.

[![Build Status](https://circleci.com/gh/houd1ni/lafetch/tree/master.svg?style=shield)](https://circleci.com/gh/houd1ni/lafetch/tree/master) [![codecov](https://codecov.io/gh/houd1ni/lafetch/branch/master/graph/badge.svg)](https://codecov.io/gh/houd1ni/lafetch) [![bundlephobia](https://badgen.net/bundlephobia/minzip/lafetch)](https://bundlephobia.com/result?p=lafetch)  [![npm](https://badgen.net/npm/v/lafetch)](https://www.npmjs.com/package/lafetch) [![Deps](https://david-dm.org/houd1ni/lafetch.svg)](https://david-dm.org/houd1ni/lafetch) [![DevDeps](https://david-dm.org/houd1ni/lafetch/dev-status.svg)](https://david-dm.org/houd1ni/lafetch)

* Binary data support and full tests are coming soon. *

# USAGE

```javascript

// It's a full toolkit with types. Importing only Fetch is fine.
import { Fetch, addHeaders, Query, Headers } from 'lafetch'

// Default values.
const api = new Fetch({
  // Automatically turns response into an object.
  // Otherwise, returns raw response from fetch API:
  //   do `await response.json() to get it.
  json?: true,
  // Common base url. E.g. your api domain.
  base?: '/',
  // Object with headers.
  headers?: {},
  // List of async middlewares executed from last to first
  //   procesing queries.
  middleware?: {
    in?: [], // ({query, response}) => Promise<{query, response}>
    out?: [] // (query: Query) => Promise<Query>
  },
  // fetch adapter. Defaults to the window fetch.
  // In node can work with https://www.npmjs.com/package/node-fetch
  // But there many of config fields are not implemented, i.e. credentials. 
  adapter?: fetch,
  credentials?: 'omit' | 'same-origin' | 'include', // fetch API credentials field.
  throwCodes?: /5../, // HTTP status codes to throw. Defaults to /\n/ (no throws at all).
  handleArrays?: '[]' // querystring: arr[]=1&arr[]=2&... vs arr=1,2,...
})
```
*Query is of type*
```typescript
interface Query {
  url: string
  method?: RESTMethods // e.g. 'get' or 'post'
  // Prevents query from going to server and returns this.
  // Useful for mocks.
  result?: any
  // querystring parameters.
  params?: {
    [name: string]: string | null
  }
  headers?: Headers
  json?: boolean
  credentials?: 'same-origin', // fetch API credentials field. Same as in the config.
  throwCodes?: /5../, // Status codes to throw. Same as in the config.
  handleArrays?: '[]' // querystring: arr[]=1&arr[]=2&... vs arr=1,2,...
}
```

*Real example:*
```javascript
// addHeaders helper is curried.
const addDevHeaders = async (query) => addHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer 123123123'
})(query)

const api = new Fetch({
  base: 'https://api.example.com/',
  middleware: [
    out: [  // to a server.
      addDevHeaders
    ],
    in: [  // from a server.
      // You can handle error status codes, for instance.
      async ({query, response}) => ({query, response})
    ]
  ]
})

// Argument is a Query.
const data = await api.query({
  url: '/goods',
  params: {
    minPrice: 100,
    maxPrice: 200,
    cat: 'smartphones'
  }
})

const response = await api.query({
  json: false,
  url: '/goods',
  params: {
    minPrice: 100,
    maxPrice: 200,
    cat: 'smartphones'
  }
})

```