<script lang="ts" setup>
const props = defineProps({
  isShowMenu: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <aside class="sidebar" :class="{ 'is-not-show-menu': !props.isShowMenu }">
    <h2 class="logo">MyMusic</h2>

    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/search">Search</NuxtLink>
      <NuxtLink to="/playlist">Playlists</NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100%;
  }

  .is-not-show-menu {
    display: none;
  }
  
  .sidebar &.is-not-show-menu {
    display: none;
  }
}

.sidebar {
  width: 240px;
  background: #121212;
  color: white;
  padding: 16px;
}

.logo {
  margin-bottom: 24px;
}

nav a {
  display: block;
  color: #b3b3b3;
  margin-bottom: 12px;
  text-decoration: none;
}

nav a.router-link-active {
  color: #1db954;
}
</style>
