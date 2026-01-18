<template>
  <div class="layout">
    <AppSidebar />
    <div class="main">
      <AppHeader />
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
