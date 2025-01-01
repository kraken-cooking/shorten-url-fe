<script lang="ts" setup>
const coreValues = [
  {
    title: '5 Free URL Shortens',
    description: 'Start shortening immediately with 5 free links. No credit card required.',
    icon: 'Link',
  },
  {
    title: '5 Free URL Shortens',
    description: 'Start shortening immediately with 5 free links. No credit card required.',
    icon: 'Link',
  },
  {
    title: '5 Free URL Shortens',
    description: 'Start shortening immediately with 5 free links. No credit card required.',
    icon: 'Link',
  },
]
</script>
<template>
  <section>
    <div class="title">
      <h1>URL Shortening Made Easy and Affordable</h1>
      <p>
        Transform long, complex URLs into short, memorable links with our powerful shortening
        service.
      </p>
    </div>

    <div class="cta">
      <RouterLink to="/app">
        <button>Get started</button>
      </RouterLink>
    </div>
  </section>

  <section class="core-value-section">
    <h2>Core Values</h2>

    <div class="card-content">
      <div class="card-item" v-for="coreValue in coreValues" :key="coreValue.title">
        <div class="card-header">
          <div class="card-icon">
            {{ coreValue.icon }}
          </div>
        </div>
        <p class="card-title">
          {{ coreValue.title }}
        </p>
        <p class="card-description">
          {{ coreValue.description }}
        </p>
      </div>
    </div>
  </section>

  <section class="last-section" />
</template>

<style lang="css" scoped>
.title {
  margin-top: 40px;
  text-align: center;

  h1 {
    font-size: 40px;
    font-weight: 700;
    color: var(--primary-color);
  }

  p {
    max-width: 75%;

    font-size: 20px;
    font-weight: 500;

    margin: auto;
    margin-top: 8px;
  }
}

.cta {
  margin-top: 16px;

  button {
    margin: auto;
    background: var(--accent-color-1);
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 500;
    color: white;
  }

  button:hover {
    background-color: #c0392b;
  }
}

.core-value-section {
  margin-top: 32px;

  h2 {
    text-align: center;
    color: var(--primary-color);

    font-size: 32px;
    font-weight: 500;
  }

  .card-content {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 1024px;
    margin: auto;
    padding: 0 16px;

    .card-item {
      background-color: var(--color-background-soft);
      border-radius: 10px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .card-item:hover {
      transform: translateY(-5px);
    }

    .card-title {
      font-size: 24px;
      font-weight: 500;
    }

    .card-description {
      margin-top: 4px;

      font-size: 16px;
    }
  }
}

.last-section {
  padding: 32px 0;
}
</style>
