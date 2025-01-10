<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button @click="cancel">Cancel</button>
        <button @click="confirm">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/stores/modal'
import { computed } from 'vue'

const modalStore = useModalStore() // Access modal store

const isVisible = computed(() => modalStore.isVisible)
const title = computed(() => modalStore.title)
const confirm = computed(() => modalStore.confirm)
const cancel = computed(() => modalStore.cancel)
const message = computed(() => modalStore.message)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

h3 {
  font-weight: 800;
  font-size: 20px;
}

.modal-content {
  background: var(--color-background-mute);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

button:first-child {
  background-color: #ccc;
}

button:last-child {
  background-color: #007bff;
  color: white;
}
</style>
