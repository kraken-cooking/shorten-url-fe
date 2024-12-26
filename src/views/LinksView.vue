<script setup lang="ts">
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import { ref } from 'vue'
import axios from 'axios'

const urls = [
  { longUrl: 'https://longurl1.com', shortUrl: 'https://short.ly/abcd123' },
  { longUrl: 'https://longurl2.com', shortUrl: 'https://short.ly/xyz456' },
]

const username = 'John Doe'

const longUrl = ref('')
const error = ref('')
const shortenedUrl = ref('')

const isCreating = ref(false)

const logout = () => {
  console.log('call logout')
}

const createShortUrl = async () => {
  if (!longUrl.value) {
    error.value = 'Please enter a URL to shorten'
    return
  }

  isCreating.value = true

  try {
    const response = await axios.get(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl.value)}`,
    )

    shortenedUrl.value = response.data.result.full_short_link
  } catch (err) {
    error.value = 'Error shortening URL. Please try again later.'
    console.log(err)
  } finally {
    isCreating.value = false
  }

  console.log('call')
}
</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <div class="profile">
        <img src="@/assets/avatar.png" alt="Profile" class="profile-avatar" />
        <div class="profile-menu">
          <span>{{ username }}</span>
          <ul>
            <li @click="logout">Logout</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="app-content">
      <!-- Section shorten URL input -->
      <section class="create-url">
        <h2>Create a New Shortened URL</h2>
        <form @submit.prevent="createShortUrl">
          <div class="form-group">
            <label for="long-url">Enter Long URL</label>
            <input
              type="url"
              id="long-url"
              v-model="longUrl"
              placeholder="https://example.com"
              required
            />
          </div>
          <button type="submit" :disabled="isCreating">Create Short URL</button>
        </form>

        <div v-if="shortenedUrl" class="shortened-url">
          <p>
            Shortened URL: <a :href="shortenedUrl" target="_blank">{{ shortenedUrl }}</a>
          </p>
        </div>
        <p v-if="error" style="color: red">{{ error }}</p>
      </section>

      <!-- Section for Listing Current Shortened URLs -->
      <section class="url-list">
        <h2>Current Shortened URLs</h2>
        <table v-if="urls.length > 0">
          <thead>
            <tr>
              <th>Index</th>
              <th>Long URL</th>
              <th>Short URL</th>
              <th>Expire date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(url, index) in urls" :key="index">
              <td class="row-item">
                <p>
                  {{ index + 1 }}
                </p>
              </td>
              <td class="row-item">
                <a :href="url.longUrl" target="_blank">{{ url.longUrl }}</a>
              </td>
              <td class="row-item">
                <a :href="url.shortUrl" target="_blank">{{ url.shortUrl }}</a>
              </td>
              <td class="row-item">
                <p>27/01/2024 00:30</p>
              </td>
              <td class="row-item row-action">
                <button class="action-button">
                  <IconEdit />
                </button>
                <button class="action-button">
                  <IconDelete />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No URLs shortened yet.</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 12px;
}

.app-header {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
}

.profile {
  position: relative;
  line-height: 0;
}

.profile-avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  background-color: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 150px;
  padding: 10px;
}

.profile:hover .profile-menu {
  display: block;
}

.profile-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.profile-menu li {
  padding: 8px;
  cursor: pointer;
}

.profile-menu li:hover {
  background-color: #f1f1f1;
}

.app-content {
  margin-top: 20px;
}

h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.create-url,
.url-list {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.shortened-url {
  margin-top: 20px;
  color: #42b983;
}

table {
  width: 100%;
}

.row-item {
  text-align: center;
}

.row-action button {
  margin-left: 4px;
}

.action-button {
  padding: 4px;
  line-height: 0;
}
</style>
