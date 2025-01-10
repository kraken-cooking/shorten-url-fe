<script lang="ts" setup>
import FormLayout from '@/views/FormLayout.vue'

import router from '@/router'
import { ref } from 'vue'
import { apiUrls } from '@/config'
import { useToastStore } from '@/stores/toast'
import { useDataStore } from '@/stores/data'

const { showToast } = useToastStore()

const { setToken } = useDataStore()

const formData = ref({
  username: '',
  password: '',
})

const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = () => {
  // Reset error message
  errorMessage.value = ''

  // Simple validation: Check if fields are empty
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = 'Please fill in both fields.'
    return
  }

  // Simulating an API call
  isLoading.value = true

  // Mock authentication (Replace this with real authentication logic)
  isLoading.value = false

  const requestBody = {
    username: formData.value.username,
    password: formData.value.password,
  }

  fetch(apiUrls.login, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const res = await response.json()

      if (!response.ok) {
        throw new Error(res.error || response.statusText)
      } else {
        showToast('Successful Login!')
        const token = res.token

        setToken(token)
        router.push('/app')
      }
    })
    .catch((err) => {
      errorMessage.value = err
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <FormLayout>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-group">
          <button type="submit" :disabled="isLoading">
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>

      <p class="signup-link">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
  </FormLayout>
</template>

<style scoped>
.login-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: var(--color-background-mute);
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #42b983;
  text-decoration: none;
}
</style>
