import { USER } from './mutation-types'

import { UserTransformer } from '../../transformers/UserTransformer'

import 'firebase/auth'
import * as firebase from 'firebase/app'

const requests = {
  user: null,
}

export default {
  getLogin ({ commit }, formData) {
    requests.user = new Promise((resolve, reject) => {
      try {
        firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
          .then(response => {
              const token = response
              commit(USER, { user: UserTransformer.fetch(token.user) })
              resolve({ user: UserTransformer.fetch(token.user) })
            }
          )
      } catch (e) {
        reject(e)
      } finally {
        requests.user = null
      }
    })
    return requests.user
  },

  getAuth ({ commit }) {
    requests.user = new Promise((resolve, reject) => {
      try {
        const token = firebase.auth().currentUser
        if (token) {
          commit(USER, { user: UserTransformer.fetch(token) })
          resolve({ user: UserTransformer.fetch(token) })
        }
      } catch (e) {
        reject(e)
      } finally {
        requests.user = null
      }
    })
    return requests.user
  },

  logOut ({ commit }) {
    requests.user = new Promise((resolve, reject) => {
      try {
        firebase.auth().signOut()
          .then(_ => {
              commit(USER, { user: { idToken: null, email: null } })
              resolve({ user: { idToken: null, email: null } })
            }
          )
      } catch (e) {
        reject(e)
      } finally {
        requests.user = null
      }
    })
    return requests.user
  }
}
