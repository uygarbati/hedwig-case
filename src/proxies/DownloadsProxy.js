import { BaseProxy } from './BaseProxy'

export class DownloadsProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `rt/downloads`,
      api: 'cw',
    })
  }
}
