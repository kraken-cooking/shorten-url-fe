<template>
  <div class="login-container">
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" placeholder="Enter your username" required />
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

    <p class="signup-link">Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      username: '',
      errorMessage: '',
      isLoading: false,
    }
  },
  methods: {
    handleSignUp() {
      // Reset error message
      this.errorMessage = ''

      // Simple validation: Check if fields are empty
      if (!this.username) {
        this.errorMessage = 'Please fill in usernamek.'
        return
      }

      // Simulating an API call
      this.isLoading = true

      // Mock authentication (Replace this with real authentication logic)
      setTimeout(() => {
        this.isLoading = false

        // Mock validation
        this.$router.push('/login')
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
