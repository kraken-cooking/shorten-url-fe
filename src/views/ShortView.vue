<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiUrls } from '@/config'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const shortId = route.params.shortId
const loading = ref(true)
const notFound = ref(false)

const fetchOriginalUrl = async (shortId: string) => {
  try {
    const response = await axios.get(`${apiUrls.shorten}/${shortId}`)

    const originalUrl = response.data.originalUrl

    if (originalUrl) {
      window.location.href = originalUrl
    } else {
      throw new Error('Not found url')
    }
  } catch (error) {
    console.error('Error fetching URL:', error)
    notFound.value = true
    loading.value = false
  }
}

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  if (typeof shortId === 'string') {
    fetchOriginalUrl(shortId)
  } else {
    loading.value = false
    notFound.value = true
  }
})
</script>

<template>
  <div>
    <!-- Loader -->
    <div v-if="loading" class="loading">Loading...</div>

    <!-- Not Found Page -->
    <div v-else-if="notFound" class="not-found-container">
      <div class="not-found">
        <h1 class="error-code">404</h1>
        <h2 class="error-message">Oops! The link you are looking for doesn't exist.</h2>
        <p class="suggestion">The URL may have been mistyped or no longer available.</p>
        <button @click="goHome" class="go-home-btn">Go Home</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* General Styles */
.loading {
  font-size: 1.5rem;
  text-align: center;
}

.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f9f9f9, #e1e1e1);
}

.not-found {
  text-align: center;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  animation: fadeIn 0.5s ease-in-out;
}

.error-code {
  font-size: 100px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 20px;
}

.error-message {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.suggestion {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.go-home-btn {
  margin: auto;
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.go-home-btn:hover {
  background-color: #2980b9;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
