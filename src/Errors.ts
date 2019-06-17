interface Response {
  status: number
}

abstract class FetchError {
  /** E.g. 5xx for internal server error. */
  private response: Response
  protected pattern: RegExp = /never/
  protected name: string = 'Fetch'
  public get type() {
    return this.name.toLowerCase()
  }
  /** Checks is the response actually of this sort of Errors. */
  private is(status: number) {
    return this.pattern.test(String(status))
  }
  protected try() {
    const { response } = this
    // console.log({t: this, response, pattern: this.pattern, is: this.is(response.status)})
    if(this.is(response.status)) {
      throw new Error(`HTTP ${this.name} error: status is ${response.status}`)
    }
  }
  /** Throws itself in the case of the error of response. */
  constructor( response: Response ) {
    this.response = response
  }
}

export class AccessError extends FetchError {
  pattern = /4\d[13]/
  name = 'Access'
  constructor(response: Response) {
    super(response)
    this.try()
  }
}

export class ServerError extends FetchError {
  pattern = /5\d\d/
  name = 'Server'
  constructor(response: Response) {
    super(response)
    this.try()
  }
}