<script lang="ts" setup>
import { useMusicMainStore } from '../store/musicMainStore';

const store = useMusicMainStore();
const idBadgeFocus = ref<number>(0);

const focusBadge = async (id: number) => {
    if (idBadgeFocus.value === id) {
        idBadgeFocus.value = 0;
        await store.getAllMusicTracks();
        return;
    }
    idBadgeFocus.value = id;

    await store.getMusicTrackByBadgeId(id);
};

const handlePlay = async (id: number) => {
    const find = store.musicTracks.find((track) => {
        if (track.music_tracks.id === id) {
            store.musicTrack = track;
            store.musicId = id;
        }
    });

    if (find) {
        store.musicTrack = find
        store.musicId = id;
    }
};

onMounted(async () => {
    await store.getAllCategoriesMusic();
});
</script>

<template>

    <div class="mt-4 container-fluid">
        <div class="row">
            <div class="col-12 d-flex flex-row gap-3">
                <span v-for="badge in store.badges" class="badge" :class="idBadgeFocus === badge.id ? 'focused' : ''"
                    @click="focusBadge(badge.id)">
                    {{ badge.name }}
                </span>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-12 my-4">
                <h3 class="text-white fw-bold">
                    {{idBadgeFocus === 0 ? 'All Music' : store.badges.find((b) => b.id === idBadgeFocus)?.name}}
                </h3>
            </div>
            <div v-for="value in store.musicTracks"
                class="col-12 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mb-4">
                <VMusicCard :active="store.musicId === value.music_tracks.id" :artist="value.artist"
                    :musicTracks="value.music_tracks" @play="handlePlay($event)" />
            </div>
        </div>
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
    background-color: #1db954;
    border: 1px solid #121212;
}

.focused:hover {
    background-color: #1db95470;
}
</style>