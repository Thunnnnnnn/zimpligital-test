<script lang="ts" setup>
const isShowMenu = ref(false);
</script>

<template>
  <div class="layout">

    <AppSidebar :is-show-menu="isShowMenu" />

    <div class="main">

      <AppHeader @toggle-menu="isShowMenu = $event" />
      <div class="responsive">
        <slot />
      </div>

    </div>

  </div>
  <div class="responsive-footer">
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
}

.responsive {
  padding-left: 240px;
  padding-bottom: 80px;
  padding-top: 64px;
}

.responsive-footer {
  /* padding-left: 240px; */
  padding-bottom: 80px;
  padding-top: 64px;
}

@media (max-width: 905px) {
  .responsive {
    padding-left: 0px;
  }
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
