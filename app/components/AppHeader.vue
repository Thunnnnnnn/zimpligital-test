<script lang="ts" setup>
const isShowMenu = ref(false)

const emit = defineEmits(["toggle-menu"])

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
  emit("toggle-menu", isShowMenu.value);
};
</script>

<template>
  <header class="header">
    <input type="text" placeholder="Search for songs..." class="search" />


    <button class="text-white fs-2 cursor-pointer menu ms-2" style="background-color: transparent; border: none;"
      @click="toggleMenu()">
      ☰
    </button>

  </header>
</template>

<style scoped>
.header {
  height: 64px;
  background: #181818;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.search {
  width: 300px;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  outline: none;
}

@media (min-width: 768px) {
  .menu {
    display: none;
  }
}
</style>
