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
    <h2 class="logo mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28"
        height="28" fill="white">
        <path
          d="M22.916.691A2.992,2.992,0,0,0,20.447.053L8.448,2.3A3,3,0,0,0,6,5.251V16.556A3.959,3.959,0,0,0,4,16a4,4,0,1,0,4,4V9.42L22,6.8v6.761A3.959,3.959,0,0,0,20,13a4,4,0,1,0,4,4V3A3,3,0,0,0,22.916.691ZM4,22a2,2,0,1,1,2-2A2,2,0,0,1,4,22ZM8,7.386V5.251a1,1,0,0,1,.815-.983l12-2.25A1,1,0,0,1,22,3v1.76ZM20,19a2,2,0,1,1,2-2A2,2,0,0,1,20,19Z" />
      </svg>
      <span class="ps-3 fs-4">
        Music
      </span>

    </h2>
    <div class="mt-4">
      <nav class="d-flex flex-column gap-1 w-100">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/playlist">Playlists</NuxtLink>
        <NuxtLink to="/music">Music</NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
@media (max-width: 905px) {

  .is-not-show-menu {
    display: none;
  }

  .sidebar &.is-not-show-menu {
    display: none;
  }


}

@media (min-width: 768px) {
  .logo {
    display: flex;
    justify-content: start;

    align-items: center;
  }
}

.sidebar {
  width: 240px;
  background: #121212;
  color: white;
  padding: 16px;
  position: fixed;
  height: 100%;
  z-index: 999;
}

.logo {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 12px;
}

nav a {
  display: block;
  color: #b3b3b3;
  margin-bottom: 12px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  padding: 12px 12px;
}

nav a.router-link-active {
  color: #1db954;
  border-radius: 8px;
}
</style>
