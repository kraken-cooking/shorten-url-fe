<script setup lang="ts">
import ToastNotification from '@/components/ToastNotification.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <div class="sidebar">
      <h3>LShort</h3>
      <ul>
        <li><router-link to="/app" class="nav-link">Home</router-link></li>

        <!--
        <li><router-link to="/app/links" class="nav-link">Links</router-link></li>
-->
      </ul>
    </div>

    <div class="content">
      <RouterView />
    </div>
  </div>
  <ToastNotification />
</template>

<style lang="css" scoped>
.sidebar {
  width: 250px;
  background-color: #2f3b52;
  color: white;
  padding: 15px;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
}

.sidebar h3 {
  margin-top: 0;
  font-size: 24px;
  font-weight: 700;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.sidebar ul li a:hover {
  color: #58a6ff;
}

.content {
  margin-left: 260px;
  padding: 20px;
  flex-grow: 1;
}

.nav-link {
  display: block;
}
</style>
