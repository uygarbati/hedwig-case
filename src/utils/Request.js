import axios from 'axios'
import store from '@/store'

const CW = axios.create({
  baseURL: process.env.VUE_APP_CWAPI,
  headers: {},
})

let requestInterceptors = [
  [
    function (config) {
      const token = store.getters['common/getToken']
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  ],
]

let responseInterceptors = [
  [
    function (response) {
      return response
    },
    function (error) {
      const { status, data } = error.response
      if (parseInt(status, 10) === 401) {
        store.dispatch('common/logOut')
      }
      if (parseInt(status, 10) === 422) {
        const { errors } = data
        let messages = []
        Object.keys(errors).forEach(field => {
          messages.push(errors[field])
        })
      }
      return Promise.reject(error)
    },
  ],
]

responseInterceptors.forEach(interceptor => {
  CW.interceptors.response.use(...interceptor)
})

requestInterceptors.forEach(interceptor => {
  CW.interceptors.request.use(...interceptor)
})

export {
  CW,
}
