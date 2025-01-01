<script lang="ts" setup>
import ToastNotification from '@/components/ToastNotification.vue'
</script>

<template>
  <div class="layout-container">
    <div class="layout-content">
      <slot></slot>
    </div>
  </div>

  <ToastNotification />
</template>

<style lang="css">
.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 400px;
  justify-content: center;
  align-items: center;
}
</style>
