
type Callback<T> = (data: T) => void

export class Cached<T = any> {
  private cache: {
    [key: string]: T
  } = {}
  private proceccing: {
    [key: string]: {
      ff: Callback<T>
      rj: Callback<T>
    }[]
  } = {}
  protected tryCache(key: string, fetchFn: () => Promise<T>): Promise<T> {
    return new Promise((ff, rj) => {
      if(this.cache[key]) {
        ff(this.cache[key])
      } else if(this.proceccing[key]) {
        this.proceccing[key].push({ ff, rj })
      } else {
        this.proceccing[key] = [{ ff, rj }]
        fetchFn().then(data => {
          this.cache[key] = data
          this.proceccing[key].forEach(({ ff }) => ff(data))
          delete this.proceccing[key]
        }).catch((e) => {
          this.proceccing[key].forEach(({ rj }) => rj(e))
        })
      }
    })
  }
}