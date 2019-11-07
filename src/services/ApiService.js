import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API
})

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete
}