<script setup lang="ts">
import {
    useVueTable,
    getCoreRowModel,
    getSortedRowModel,
    FlexRender,
} from '@tanstack/vue-table'

interface Column {
    key: string
    label: string
}

const props = defineProps({
    columns: {
        type: Array as () => Column[],
        required: true,
    },
    data: {
        type: Array as () => any[],
        required: true,
    },
})

const flexRender = FlexRender;

const table = useVueTable({
    data: props.data,
    columns: props.columns.map(col => ({
        accessorKey: col.key,
        header: col.label,
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
})

const getKeyInData = () => {
    return  
};
</script>

<template>
    <table class="table table-striped table-hover">
        <thead>
            <!-- <tr>
                <th v-for="header in table.getHeaderGroups()[0] ? table.getHeaderGroups()[0]!.headers : []"
                    :key="header.id" @click="header.column.toggleSorting()" style="cursor:pointer">
                    <FlexRender :renderer="header.column.columnDef.header" :context="header.getContext()" />
                </th>
            </tr> -->
        </thead>

        <tbody>

            <!-- <tr v-for="row in table.getRowModel().rows" :key="row.id">
                <td v-for="cell in getKeyInData()" :key="cell.key">
                    {{ row.getVisibleCells() }}
                    <slot :name="`item-${row.id}`" :item="row.original"></slot>
                    <FlexRender :renderer="cell.column.columnDef.cell" :context="cell.getContext()" />
                </td>
            </tr> -->
        </tbody>
    </table>
</template>
