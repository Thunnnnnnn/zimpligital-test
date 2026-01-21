<script lang="ts" setup>
import { useMusicMainStore } from '../store/musicMainStore';

const store = useMusicMainStore();
const idBadgeFocus = ref<number>(0);

const focusBadge = (id: number) => {
    if (idBadgeFocus.value === id) {
        idBadgeFocus.value = 0;
        return;
    }
    idBadgeFocus.value = id;
};

onMounted(async () => {
    await store.getAllCategoriesMusic();
});
</script>

<template>
    <div class="container">
        <div class="mt-4">
            <div class="row">
                <div class="col-12 d-flex flex-row gap-3">
                    <span v-for="badge in store.badges" class="badge"
                        :class="idBadgeFocus === badge.id ? 'focused' : ''" @click="focusBadge(badge.id)">
                        {{ badge.name }}
                    </span>
                </div>
            </div>
        </div>

        <!-- <audio controls src="" /> -->
    </div>
</template>

<style scoped>
.badge {
    background-color: #121212;
    padding: 6px 16px;
    border-radius: 8px;
    font-weight: bold;
    display: flex;
    text-align: center;
    color: #ffffff;
    border: 1px solid #121212;
}

.badge:hover {
    background-color: #12121240;
    color: #ffffff;
    cursor: pointer;
}

.focused {
    background-color: white;
    color: #121212;
    border: 1px solid #121212;
}

.focused:hover {
    background-color: #a7a7a7;
    color: #121212;

}
</style>