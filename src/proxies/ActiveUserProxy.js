import { BaseProxy } from './BaseProxy'

export class ActiveUserProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `rt/activeUsers`,
      api: 'cw',
    })
  }
}
