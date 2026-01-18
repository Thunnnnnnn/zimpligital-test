<script lang="ts" setup>
const test = ref('')


onBeforeMount(async () => {
    const res = await useFetch('/api', { method: 'GET' })
    const resPost = await useFetch('/api', { method: 'POST' })
    console.log(res.data.value)
    console.log(resPost.data.value)
})
</script>

<template>
    <div class="row container">
        <!-- <VTextInput v-model="test" label="test" placeholder="test" /> -->
    </div>
</template>