import { BaseProxy } from './BaseProxy'

export class ChartDownloadsProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `daily/downloads`,
      api: 'cw',
    })
  }
}
