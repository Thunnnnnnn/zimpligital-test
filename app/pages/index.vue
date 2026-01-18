<script lang="ts" setup>
const test = ref('')


onMounted(async () => {
  const { data } = await fetch('/api').then(res => res.json())
  console.log(data.value)
})
</script>

<template>
    <div class="row container">
        <!-- <VTextInput v-model="test" label="test" placeholder="test" /> -->
    </div>
</template>