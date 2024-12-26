<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
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
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    }
  },
  methods: {
    handleLogin() {
      // Reset error message
      this.errorMessage = ''

      // Simple validation: Check if fields are empty
      if (!this.username || !this.password) {
        this.errorMessage = 'Please fill in both fields.'
        return
      }

      // Simulating an API call
      this.isLoading = true

      // Mock authentication (Replace this with real authentication logic)
      setTimeout(() => {
        this.isLoading = false

        // Mock validation
        if (this.username === 'user' && this.password === 'password123') {
          this.$router.push('/app') // Redirect to the App page on successful login
        } else {
          this.errorMessage = 'Invalid username or password'
        }
      }, 1000)
    },
  },
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
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
