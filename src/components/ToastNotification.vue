<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
</script>

<template>
  <div v-if="toast.visible" class="toast">
    <p>{{ toast.message }}</p>
  </div>
</template>

<style lang="css" scoped>
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 15px;
  border-radius: 5px;
  z-index: 1000;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}
</style>
