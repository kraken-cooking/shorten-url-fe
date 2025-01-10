<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'

import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

import axios from 'axios'
import { useDataStore } from '@/stores/data'
import { useModalStore } from '@/stores/modal'
import { useToastStore } from '@/stores/toast'
import { useRouter } from 'vue-router'
import { apiUrls } from '@/config'

import apiClient from '@/axios'
import { config } from '@/config'

const { removeToken, getToken } = useDataStore()

const router = useRouter()
const modalStore = useModalStore()
const toast = useToastStore()

const urls = ref([])

const longUrl = ref('')
const error = ref('')
const shortenedUrl = ref('')

const isCreating = ref(false)

const logout = () => {
  removeToken()
  router.push('/login')
}

const createShortUrl = async () => {
  if (!longUrl.value) {
    error.value = 'Please enter a URL to shorten'
    return
  }

  isCreating.value = true

  try {
    const response = await axios.post(
      apiUrls.links,
      {
        original_url: longUrl.value,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    )

    shortenedUrl.value = response.data.shortUrl
  } catch (err) {
    error.value = 'Error shortening URL. Please try again later.'
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const fetchData = async () => {
  const response = await apiClient.get(apiUrls.links)
  const data = response.data
  urls.value = data
}

const isDropdownVisible = ref(false)

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value
}

const generateShortLink = (shortId: string) => {
  return `${config.feUrl}/short/${shortId}`
}

const handleDelete = (linkId: number) => {
  modalStore.showModal('Confirm Delete', 'Are you sure you want to delete this item?', () => {
    apiClient
      .delete(`${apiUrls.links}/${linkId}`)
      .then(() => {
        toast.showToast('Delete link successful!')
        urls.value = urls.value.filter((item) => item.ID !== linkId)
      })
      .catch(() => {
        toast.showToast('Delete fail!')
      })
  })
}

onBeforeMount(fetchData)
</script>

<template>
  <div class="app-container">
    <div class="app-header">
      <div class="profile">
        <div class="avatar-container" @click="toggleDropdown">
          <img class="avatar" src="@/assets/avatar.png" alt="User Avatar" />

          <!-- Dropdown menu -->
          <div v-if="isDropdownVisible" class="dropdown-menu">
            <!--
            <a href="/profile" class="dropdown-item">Profile</a>
-->
            <button @click="logout" class="dropdown-item">Logout</button>
          </div>
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
                <a :href="url.originalUrl" target="_blank">{{ url.originalUrl }}</a>
              </td>
              <td class="row-item">
                <a :href="generateShortLink(url.shortUrl)" target="_blank">{{ url.shortUrl }}</a>
              </td>
              <td class="row-item">
                <p>27/01/2024 00:30</p>
              </td>
              <td class="row-item row-action">
                <button class="action-button" disabled>
                  <IconEdit />
                </button>
                <button class="action-button action-delete" @click="handleDelete(url.ID)">
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
  <ConfirmModal />
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

.row-action {
  display: flex;
  justify-content: flex-end;
  gap: 4px;
}

.action-button {
  padding: 4px;
  line-height: 0;
}

.avatar-container {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 45px; /* Position below the avatar */
  right: 0;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
  padding: 10px 0;
  z-index: 100;
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: inherit;
  font-size: 14px;
  line-height: 1px;
  cursor: pointer;
  width: 100%;
  background: white;
  border-radius: 0;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

.action-delete {
  background: red;
}
</style>
