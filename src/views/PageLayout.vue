<script lang="ts">
export default {
  name: 'PageLayout',
}
</script>
<template>
  <header>
    <h1>UShortLink</h1>
    <p>Simplify your links, amplify your reach</p>
  </header>
  <div class="content">
    <slot></slot>
  </div>
  <footer>
    <p>© 2024 UShortLink. All rights reserved.</p>
  </footer>
</template>

<style lang="css">
:root {
  --primary-color: #42b983;
  --secondary-color: #35495e;

  --accent-color-1: #e74c3c;
}

header {
  padding: 16px 32px;
  text-align: center;

  background: var(--primary-color);
  color: white;

  h1 {
    font-size: 28px;
    font-weight: 700;
  }

  p {
    font-size: 20px;
  }
}

.content {
  max-width: 1280px;
  margin: auto;
}

footer {
  padding: 8px;
  color: white;
  background: var(--secondary-color);
  text-align: center;
  font-weight: 500;
}
</style>
