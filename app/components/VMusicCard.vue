<script setup lang="ts">
import type { PropType } from 'vue';
import type { IArtist, IMusicTrack } from '~/core/modules/music-main/infrastructure/MusicMainModel';

const props = defineProps({
    musicTracks: {
        type: Object as PropType<IMusicTrack>,
        required: true,
    },
    artist: {
        type: Object as PropType<IArtist>,
        required: true,
    }
});

const emit = defineEmits(['play']);
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="row mt-md-3">
                <div class="col-4 col-xs-3 col-sm-12">
                    <div class="img-container">
                        <img :src="musicTracks.albumImgUrl" :alt="musicTracks.title" style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-8 col-xs-9 col-sm-12 mt-sm-2 mt-0">
                    <span class="title">
                        {{ musicTracks.title }}
                    </span>
                    <br>
                    <span class="artist">
                        {{ artist.name }}
                    </span>
                </div>

            </div>


            <button class="play-btn" @click="emit('play', musicTracks.id)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path
                        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.img-container {
    height: 120px;
    width: 120px;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

img {
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    width: 100%;
}

.title {
    font-weight: bold;
    font-size: 1.4rem;
    color: #FFFFFF;
}

.artist {
    font-size: 0.8rem;
    color: #AAAAAA;
}

.card {
    background-color: #121212;
    border-radius: 12px;
    width: 100%;
}

.play-btn {
    position: absolute;
    bottom: 20px;
    right: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
}

.play-btn:hover {
    background-color: #d6d6d6;
    cursor: pointer;
}

@media (max-width: 576px) {
    .img-container {
        height: 80px;
        width: 80px;
    }
}
</style>