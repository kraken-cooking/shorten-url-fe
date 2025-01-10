import axios from 'axios'

import { useDataStore } from './stores/data'

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useDataStore()
    const token = authStore.getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

function handleLogout() {
  const store = useDataStore()

  store.removeToken()
  window.location.href = '/login'
}

// Response interceptor to handle 401 errors and logout
apiClient.interceptors.response.use(
  (response) => response, // If no error, just return the response
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized Error: Log out the user
      handleLogout()
    }
    return Promise.reject(error) // Return the rejected promise
  },
)

export default apiClient
