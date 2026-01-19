<script lang="ts" setup>
const isShowMenu = ref(false);
</script>

<template>
  <div class="layout">
    <AppSidebar :is-show-menu="isShowMenu" />
    <div class="main">

      <AppHeader @toggle-menu="isShowMenu = $event" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
