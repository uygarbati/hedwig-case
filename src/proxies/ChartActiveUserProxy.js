import { BaseProxy } from './BaseProxy'

export class ChartActiveUserProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `daily/activeUsers`,
      api: 'cw',
    })
  }
}
