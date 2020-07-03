import { BaseProxy } from './BaseProxy'

export class PaidUsersProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `rt/paidUsers`,
      api: 'cw',
    })
  }
}
