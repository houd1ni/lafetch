import { Fetch } from '../src/Fetch'
import { formURI } from '../src/utils'

;(window as any).Fetch = Fetch
;(window as any).formURL = formURI