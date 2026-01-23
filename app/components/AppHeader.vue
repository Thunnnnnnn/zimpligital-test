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
    <div class="d-flex gap-3 align-items-center">
      <div class="logo mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="28"
          height="28" fill="white">
          <path
            d="M22.916.691A2.992,2.992,0,0,0,20.447.053L8.448,2.3A3,3,0,0,0,6,5.251V16.556A3.959,3.959,0,0,0,4,16a4,4,0,1,0,4,4V9.42L22,6.8v6.761A3.959,3.959,0,0,0,20,13a4,4,0,1,0,4,4V3A3,3,0,0,0,22.916.691ZM4,22a2,2,0,1,1,2-2A2,2,0,0,1,4,22ZM8,7.386V5.251a1,1,0,0,1,.815-.983l12-2.25A1,1,0,0,1,22,3v1.76ZM20,19a2,2,0,1,1,2-2A2,2,0,0,1,20,19Z" />
        </svg>
        <span class="ps-3 text-brand">
          Music
        </span>

      </div>
      <input type="text" placeholder="Search for songs..." class="search" />
    </div>


    <button class="text-white fs-2 cursor-pointer menu ms-2" style="background-color: transparent; border: none;"
      @click="toggleMenu()">
      ☰
    </button>

  </header>
</template>

<style scoped>
@media (min-width: 905px) {
  .header {
    width: calc(100vw - 240px);
    left: 240px;
  }

  .header .logo {
    display: none;
    font-size: 16px;
  }
}

@media (max-width: 905px) {
  .header {
    width: 100vw;
    left: 0;
  }
}

@media (max-width: 460px) {
  .header .text-brand {
    display: none;
  }
}

.logo {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block: 12px;
}

.header {
  height: 64px;
  background: #121212;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: fixed;
  width: 100vw;
  z-index: 1000;
}

.search {
  max-width: 300px;
  padding: 8px 12px;
  border-radius: 20px;
  border: none;
  outline: none;
  height: 44px;
  background-color: #3a3a3a;
  
}

.search::placeholder {
  color: #b3b3b3; 
}

@media (min-width: 905px) {
  .menu {
    display: none;
  }
}
</style>
