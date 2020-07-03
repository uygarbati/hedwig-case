export default {
  getUser (state) {
    return state.user.email
  },
  getToken (state) {
    return state.user.idToken
  }
}
