import { BaseProxy } from './BaseProxy'

export class SessionDurationProxy extends BaseProxy {
  constructor () {
    super({
      endpoint: `rt/sessionDuration`,
      api: 'cw',
    })
  }
}
