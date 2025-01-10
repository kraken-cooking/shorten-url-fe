<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'

import FormLayout from './FormLayout.vue'
import { useToastStore } from '@/stores/toast'

import { apiUrls } from '@/config'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const isLoading = ref(false)

const MIN_LENGTH = 6

const handleSignUp = () => {
  // Reset error message
  errorMessage.value = ''

  const { showToast } = useToastStore()

  // Simple validation: Check if fields are empty

  const username = formData.value.username
  const password = formData.value.password
  const confirmPassword = formData.value.confirmPassword

  const regexUsername = /^[a-zA-Z0-9]+$/

  if (username.length < MIN_LENGTH) {
    errorMessage.value = `Username must at least ${MIN_LENGTH} character`
    return
  }

  if (!regexUsername.test(username)) {
    errorMessage.value = `Username only contain alphabet and number`
    return
  }

  if (password.length < MIN_LENGTH) {
    errorMessage.value = `Password must at least ${MIN_LENGTH} character`
    return
  }

  if (password != confirmPassword) {
    errorMessage.value = `Password and confirm password not match`
    return
  }

  // Simulating an API call
  isLoading.value = true

  const requestBody = {
    username,
    password,
  }

  fetch(apiUrls.signUp, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const res = await response.json()

      if (!response.ok) {
        throw new Error(res.error || response.statusText)
      } else {
        showToast('Successful Sign up!')
        router.push('/login')
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
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp">
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
          <input type="password" id="password" v-model="formData.password" required />
        </div>

        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="formData.confirmPassword"
            required
          />
        </div>

        <div class="form-group">
          <button type="submit" :disabled="isLoading">
            <span v-if="isLoading">Send code...</span>
            <span v-else>Sign up</span>
          </button>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>

      <p class="signup-link">
        Already have an account? <router-link to="/login">Login</router-link>
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
