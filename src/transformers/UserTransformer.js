import { BaseTransformer } from './BaseTransformer'

export class UserTransformer extends BaseTransformer {
  static fetch (data) {
    return {
      idToken: data.xa,
      email: data.email,
    }
  }
}
