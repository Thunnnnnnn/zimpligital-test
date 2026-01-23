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
        <NuxtLink class="d-flex align-items-center gap-3" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24"
            height="24">
            <path
              d="M22,5.644V2.5c0-.829-.672-1.5-1.5-1.5s-1.5,.671-1.5,1.5v1.089L15.076,.941c-1.869-1.262-4.283-1.262-6.152,0L2.424,5.327C.906,6.351,0,8.055,0,9.886v8.614c0,3.033,2.468,5.5,5.5,5.5h3c.828,0,1.5-.671,1.5-1.5V14.5c0-.276,.225-.5,.5-.5h3c.275,0,.5,.224,.5,.5v8c0,.829,.672,1.5,1.5,1.5h3c3.032,0,5.5-2.467,5.5-5.5V9.886c0-1.654-.739-3.204-2-4.242Zm-1,12.856c0,1.378-1.121,2.5-2.5,2.5h-1.5v-6.5c0-1.93-1.57-3.5-3.5-3.5h-3c-1.93,0-3.5,1.57-3.5,3.5v6.5h-1.5c-1.379,0-2.5-1.122-2.5-2.5V9.886c0-.833,.412-1.607,1.102-2.073L10.602,3.427c.85-.573,1.947-.573,2.797,0l6.5,4.387c.689,.465,1.102,1.24,1.102,2.072v8.614Z" />
          </svg> Home
        </NuxtLink>
        <NuxtLink class="d-flex align-items-center gap-3" to="/playlist">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="24"
            height="24">
            <path
              d="m22.5,0h-1.5c-2.757,0-5,2.243-5,5v8.602c-.751-.385-1.6-.602-2.5-.602-3.032,0-5.5,2.467-5.5,5.5s2.468,5.5,5.5,5.5,5.5-2.467,5.5-5.5V5c0-1.103.897-2,2-2h1.5c.828,0,1.5-.671,1.5-1.5s-.672-1.5-1.5-1.5Zm-9,21c-1.379,0-2.5-1.122-2.5-2.5s1.121-2.5,2.5-2.5,2.5,1.122,2.5,2.5-1.121,2.5-2.5,2.5ZM0,1.5C0,.671.672,0,1.5,0h10c.828,0,1.5.671,1.5,1.5s-.672,1.5-1.5,1.5H1.5c-.828,0-1.5-.671-1.5-1.5Zm0,6c0-.829.672-1.5,1.5-1.5h10c.828,0,1.5.671,1.5,1.5s-.672,1.5-1.5,1.5H1.5c-.828,0-1.5-.671-1.5-1.5Zm8,6c0,.829-.672,1.5-1.5,1.5H1.5c-.828,0-1.5-.671-1.5-1.5s.672-1.5,1.5-1.5h5c.828,0,1.5.671,1.5,1.5Z" />
          </svg>Playlists
        </NuxtLink>
        <!-- <NuxtLink to="/music">Music</NuxtLink> -->
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

  svg {
    fill: #ffffff;
  }
}

nav a.router-link-active {
  color: #1db954;
  border-radius: 8px;
  background-color: #3a3a3a;

  svg {
    fill: #1db954;
  }
}
</style>
