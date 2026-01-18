<template>
  <header class="header">
    <input
      type="text"
      placeholder="Search for songs..."
      class="search"
    />

    <div class="user">
      <span>User</span>
    </div>
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
</style>
