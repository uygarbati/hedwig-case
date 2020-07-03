import { USER } from './mutation-types'

export default {
  [USER] (state, { user }) {
    state.user = user
  },
}
