import { CW } from '@/utils/Request'
import qs from 'qs'

const ApiMap = new Map()
ApiMap.set('cw', CW)

export class BaseProxy {
  constructor ({ api = 'cw', endpoint, parameters  = { headers: {} } }) {
    this.$http = ApiMap.get(api) || CW
    this.endpoint = endpoint
    this.parameters = parameters
    this.config = {}
  }

  /*setHeader (key, value) {
    this.config.headers = { ...this.config.headers, [ key ]: value }
    return this
  }

  setParameter (parameter, value) {
    this.parameters[ parameter ] = value
    return this
  }

  removeParameter (parameter) {
    delete this.parameters[ parameter ]
    return this
  }*/

  submit (requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      this.$http[ requestType ](url + this.getParameterString(), data).then((response) => {
        resolve(response.data)
      }).catch(({ response }) => {
        if (response) {
          reject(response.data)
        } else {
          reject(response)
        }
      })
    })
  }

  all () {
    return this.submit('get', `/${this.endpoint}`)
  }

  /*find ({ id }) {
    return this.submit('get', `/${this.endpoint}/${id}`)
  }

  create ({ item }) {
    return this.submit('post', `/${this.endpoint}`, item)
  }

  update ({ id, item }) {
    if (id) {
      return this.submit('put', `/${this.endpoint}/${id}`, item)
    }
    return this.submit('put', `/${this.endpoint}`, item)
  }

  destroy ({ id }) {
    return this.submit('delete', `/${this.endpoint}/${id}`)
  }

  delete ({ id }) {
    return this.submit('delete', `/${this.endpoint}/${id}`)
  }*/

  getParameterString () {
    const parameterStrings = qs.stringify(this.parameters, { encodeValuesOnly: true })
    // const keys = Object.keys(this.parameters)
    //
    // const parameterStrings = keys.filter(key => !!this.parameters[ key ])
    //   .map(key => `${key}=${this.parameters[ key ]}`)
    //
    return parameterStrings.length === 0 ? '' : `?${parameterStrings}`
  }
}
