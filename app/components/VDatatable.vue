<script setup lang="ts">

interface Column {
    key: string
    label: string
    width?: string
}

const props = defineProps({
    headers: {
        type: Array as () => Column[],
        required: true,
    },
    items: {
        type: Array as () => any[],
        required: true,
    },

    isShowHeader: {
        type: Boolean,
        default: true,
    },
})
</script>

<template>
    <table class="table table-striped table-hover">
        <thead v-if="isShowHeader">
            <tr>
                <th v-for="header in headers" :key="header.key" :style="{ cursor: 'pointer', width: header.width }">
                    {{ header.label }}
                </th>
            </tr>
        </thead>

        <tbody>

            <tr v-for="(cell, index) in items" :key="cell.key">
                <td v-for="row in headers" :key="row.key" :style="{ width: row.width }">
                    <slot :name="`item-${row.key}`" :item="cell" :index="index"></slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.table {
    background-color: #282828;
    color: white;
}

.table th {
    border-bottom: 2px solid #444;
}

.table td,
.table th {
    padding: 12px 16px;
    background-color: #282828;
    color: white;
}
</style>
