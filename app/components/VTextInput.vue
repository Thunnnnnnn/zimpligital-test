<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <label for="inputText" class="form-label">{{ label }}</label>
        <input type="text" class="form-control" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </div>
</template>