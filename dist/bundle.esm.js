import { curry, compose, replace, equals, fromPairs, map, split, join, filter, not, type, toPairs, reduce, append, mirror, forEachSerial, forEachAsync as forEachAsync$1, waitAll as waitAll$1, mapKeys as mapKeys$1, composeAsync, explore as explore$1, isEmpty, assoc, clone, mergeDeep, T } from 'pepka';

const trim = curry((symbols, str) => {
    let found_first = null, found_last = null, symbol;
    for (let i = 0; i < str.length; i++) {
        symbol = str[i];
        if (!symbols.includes(symbol)) {
            if (found_first == null) {
                found_first = i;
            }
            found_last = null;
        }
        else {
            if (found_first) {
                found_last = i;
            }
        }
    }
    return str.slice(found_first || 0, found_last || str.length);
});
const unshield = compose(replace(/&/g, '\\&'), String);
const stringifyPair = (handleArrays, key, value) => {
    switch (type(value)) {
        case 'Array':
            switch (handleArrays) {
                case '[]':
                    return compose(join('&'), reduce((accum, cur) => append(stringifyPair(handleArrays, `${key}[]`, cur), accum), []))(value);
                case ',':
                    return `${key}=` + compose(join(','), reduce((accum, val) => append(unshield(val), accum), []))(value);
            }
        default:
            return `${key}=${unshield(value)}`;
    }
};
const splitOnce = curry((delimiter, s) => {
    const i = s.search(delimiter);
    return ~i ? [s.slice(0, i), s.slice(i + 1)] : [s];
});
const parseCookie = compose(([[k, v], ...attrs]) => ({
    name: k,
    value: v,
    attrs: (equals(attrs, [null]) ? {} : fromPairs(attrs))
}), map(compose(([key, value]) => key
    ? [key, value ? decodeURIComponent(value) : true]
    : null, splitOnce(/=/))), split(/; ?/g));
const stringifyCookie = compose(join('; '), filter(compose(not, equals('Null'), type)), map((([k, v]) => v === null ? null : (v === true ? k : `${k}=${v}`))), ({ name, value, attrs }) => [[name, value], ...toPairs(attrs)]);
/** Turns query params into query string. */
const formURI = (query) => {
    const parts = [];
    if (query.params) {
        const params_part = [];
        Object.entries(query.params).forEach(([name, param]) => {
            if (param != undefined) {
                params_part.push(stringifyPair(query.handleArrays || '[]', name, param));
            }
        });
        if (params_part.length) {
            parts.push(`?${params_part.join('&')}`);
        }
    }
    return encodeURI((query.url || '') + parts.map(trim('-')).join('/'));
};
const trimSlash = trim('/');
const addBase = (base, url) => {
    if (!url.includes('://') && !url.startsWith(base)) {
        return trimSlash(base) + '/' + trimSlash(url);
    }
    else {
        return url;
    }
};
const hole = mirror;
const removeAllProps = (o) => {
    for (let k in o) {
        delete o[k];
    }
    return o;
};

// Helpers to import to apps for easier work.
/** Adds new headers to provided Query. */
const addHeaders = curry((headers, query) => {
    return {
        ...query,
        headers: { ...query.headers, ...headers }
    };
});
const forEach = forEachSerial;
const forEachAsync = forEachAsync$1;
const waitAll = waitAll$1;
const mapKeys = mapKeys$1;
const asyncpipe = composeAsync;
const explore = explore$1('_');
const clearEmpty = filter(isEmpty);
const bind = (obj, methodName) => curry(obj[methodName].bind(obj));
class Cookie {
    constructor(str) {
        this.data = null;
        if (str) {
            this.parse(str);
        }
        else {
            this.data = { name: '', value: null, attrs: {} };
        }
    }
    parse(str) {
        this.data = parseCookie(str);
        return this.get();
    }
    get() {
        return this.data;
    }
    set(v) {
        this.data.value = v;
    }
    stringify() {
        return stringifyCookie(this.data);
    }
    toString() {
        return this.stringify();
    }
}

const default_config = {
    base: '/',
    json: true,
    headers: {},
    timeout: 1e4,
    adapter: (url, conf) => fetch(url, conf),
    throwCodes: /\n/,
    credentials: 'same-origin',
    handleArrays: '[]',
    encoding: 'json',
    middleware: {
        in: [],
        out: []
    }
};
const finalTransform = (dir) => {
    return dir == 'out'
        ? hole
        : async ({ query, response }) => query.json ? await response.json() : response;
};
class Fetch {
    constructor(config = {}) {
        this.middleware = {
            in: [],
            out: [
                async (query) => {
                    query.url = formURI(query);
                    removeAllProps(query.params);
                    return query;
                },
                async (query) => {
                    query.url = addBase(this.config.base, query.url);
                    return query;
                },
                async (query) => {
                    if (type(query.body) == 'Object') {
                        const ct = 'Content-Type';
                        switch (query.encoding) {
                            case 'json':
                                return compose(addHeaders({ [ct]: 'application/json' }), assoc('body', JSON.stringify(query.body)))(query);
                            case 'url':
                                return compose(addHeaders({ [ct]: 'application/x-www-form-urlencoded' }), assoc('body', formURI({ params: query.body }).slice(1)))(query);
                            case 'multipart':
                                console.warn('lafetch: multipart encoding is not implemented yet.');
                            default:
                                // TODO:
                                return query;
                        }
                    }
                    else {
                        return query;
                    }
                },
                async (query) => {
                    for (const name in query.headers) {
                        if (type(query.headers[name]) == 'Null') {
                            delete query.headers[name];
                        }
                    }
                    return query;
                },
                async (query) => clone(query)
            ]
        };
        this.config = mergeDeep(default_config, config);
        this.basic_query = {
            url: '',
            method: 'get',
            headers: {},
            params: {},
            result: null,
            body: null,
            json: this.config.json,
            timeout: this.config.timeout,
            credentials: this.config.credentials,
            throwCodes: this.config.throwCodes,
            handleArrays: this.config.handleArrays,
            encoding: this.config.encoding,
            misc: {}
        };
        const middle = {};
        for (const dir of ['in', 'out']) {
            middle[dir] = asyncpipe(finalTransform(dir), ...this.middleware[dir], ...this.config.middleware[dir]);
        }
        this.applyMiddleware = middle;
    }
    async query(query) {
        query = await this.applyMiddleware.out(mergeDeep(this.basic_query, query));
        if (query.result) {
            return query.result;
        }
        else {
            const data = {
                method: query.method,
                headers: query.headers,
                credentials: query.credentials
            };
            if (query.body) {
                data.body = query.body;
            }
            return new Promise(async (ff, rj) => {
                let stuck = false;
                const to = setTimeout(() => {
                    stuck = true;
                    rj('timeout');
                }, query.timeout);
                try {
                    const response = await this.config.adapter(query.url, data);
                    if (!stuck) {
                        clearTimeout(to);
                        if (query.throwCodes.test(String(response.status))) {
                            rj(response.status);
                        }
                        else {
                            ff((await this.applyMiddleware.in({ query, response }))); // this should be done by finalTransform.
                        }
                    }
                }
                catch (e) {
                    clearTimeout(to);
                    rj(e);
                }
            });
        }
    }
}

class Cached {
    constructor() {
        this.cache = {};
        this.proceccing = {};
    }
    tryCacheWhen(key, cacheIf, fetchFn) {
        return new Promise((ff, rj) => {
            if (this.cache[key]) {
                ff(this.cache[key]);
            }
            else if (this.proceccing[key]) {
                this.proceccing[key].push({ ff, rj });
            }
            else {
                this.proceccing[key] = [{ ff, rj }];
                fetchFn().then(data => {
                    if (cacheIf(data)) {
                        this.cache[key] = data;
                    }
                    this.proceccing[key].forEach(({ ff }) => ff(data));
                    delete this.proceccing[key];
                }).catch((e) => {
                    this.proceccing[key].forEach(({ rj }) => rj(e));
                });
            }
        });
    }
    tryCache(key, fetchFn) {
        return this.tryCacheWhen(key, T, fetchFn);
    }
    dropCache(key = '') {
        if (key) {
            delete this.cache[key];
        }
        else {
            removeAllProps(this.cache);
        }
    }
}

class FetchError {
    /** Throws itself in the case of the error of response. */
    constructor(response) {
        this.pattern = /never/;
        this.name = 'Fetch';
        this.response = response;
    }
    get type() {
        return this.name.toLowerCase();
    }
    /** Checks is the response actually of this sort of Errors. */
    is(status) {
        return this.pattern.test(String(status));
    }
    try() {
        const { response } = this;
        // console.log({t: this, response, pattern: this.pattern, is: this.is(response.status)})
        if (this.is(response.status)) {
            throw new Error(`HTTP ${this.name} error: status is ${response.status}`);
        }
    }
}
class AccessError extends FetchError {
    constructor(response) {
        super(response);
        this.pattern = /4\d[13]/;
        this.name = 'Access';
        this.try();
    }
}
class ServerError extends FetchError {
    constructor(response) {
        super(response);
        this.pattern = /5\d\d/;
        this.name = 'Server';
        this.try();
    }
}

export { AccessError, Cached, Cookie, Fetch, ServerError, addHeaders, asyncpipe, bind, clearEmpty, explore, forEach, forEachAsync, formURI, mapKeys, waitAll };
