import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const jwtToken = ref(localStorage.getItem('jwtToken') || null)

  const getToken = () => {
    return jwtToken.value
  }

  const setToken = (token: string) => {
    jwtToken.value = token
    localStorage.setItem('jwtToken', token)
  }

  const removeToken = () => {
    jwtToken.value = null
    localStorage.removeItem('jwtToken')
  }

  return {
    jwtToken,
    getToken,
    setToken,
    removeToken,
  }
})
