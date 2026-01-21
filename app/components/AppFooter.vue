<script lang="ts" setup>
import { useMusicMainStore } from '~/core/modules/music-main/store/musicMainStore'


const isPlaying = ref(false)
const store = useMusicMainStore()
const player = ref<any | null>(null)

const playSong = async () => {
    isPlaying.value = !isPlaying.value

    if (isPlaying.value) {
        await player.value.play()
    } else {
        await player.value.pause()
    }

}

const setVolume = () => {
    const volume = store.volume / 100
    player.value.setVolume(volume)
}

const onSeeking = (e: Event) => {
    const value = Number((e.target as HTMLInputElement).value)
    store.currentTime = value
}

const onSeek = (e: Event) => {
    player.value.seek(store.currentTime)
    store.seeking = false
}

const prev = () => {
    if (store.musicTracks.length > 0) {
        const currentTrackIndex = store.musicTracks.findIndex(
            (track) => track.music_tracks.id === store.musicId
        )

        if (currentTrackIndex > 0) {
            const prevTrack = store.musicTracks[currentTrackIndex - 1]
            if (!prevTrack) return
            store.musicId = prevTrack.music_tracks.id
            store.musicTrack = prevTrack
            isPlaying.value = true
            setTimeout(() => {
                player.value.play()
            }, 500)
        } else {
            store.currentTime = 0

            player.value.seek(store.currentTime)
        }
    }
}

const next = () => {
    if (store.musicTracks.length > 0) {
        const currentTrackIndex = store.musicTracks.findIndex(
            (track) => track.music_tracks.id === store.musicId
        )

        if (currentTrackIndex === store.musicTracks.length - 1) {
            store.currentTime = 0

            player.value.seek(store.currentTime)
        } else {
            const nextTrack = store.musicTracks[currentTrackIndex + 1]
            if (!nextTrack) return
            store.musicId = nextTrack.music_tracks.id
            store.musicTrack = nextTrack
            isPlaying.value = true
            setTimeout(() => {
                player.value.play()
            }, 500)
        }
    }
}

watch(
    () => store.currentTime,
    () => {
        if (store.currentTime === store.duration) {
            isPlaying.value = false
        }

        if (store.musicTracks.length > 0) {
            const currentTrackIndex = store.musicTracks.findIndex(
                (track) => track.music_tracks.id === store.musicId
            )

            if (store.currentTime === store.duration && currentTrackIndex < store.musicTracks.length - 1) {
                const nextTrack = store.musicTracks[currentTrackIndex + 1]
                if (!nextTrack) return
                store.musicId = nextTrack.music_tracks.id
                store.musicTrack = nextTrack
                isPlaying.value = true
                setTimeout(() => {
                    player.value.play()
                }, 500)
            }
        }
    }
)

watch(
    () => store.musicId,
    () => {
        isPlaying.value = true
        setTimeout(() => {
            player.value.play()
        }, 500)
    }
)

</script>

<template>
    <footer>
        <div class="app-footer">
            <input class="seek-custom" type="range" min="0" :max="store.duration" step="0.1" :value="store.currentTime"
                @mousedown="store.seeking = true" @mouseup="onSeek" @input="onSeeking"
                @touchstart="store.seeking = true" @touchend="onSeek" />
            <VAudioPlayer ref="player" />
            <div class=" text-center py-3 row px-3">
                <div class="d-flex gap-3 col-4 align-items-center">
                    <div class="img-container">
                        <img class="album-img" :src="store.musicTrack.music_tracks.albumImgUrl" alt="#album" />
                    </div>

                    <div class="d-flex flex-column justify-content-start">
                        <span class="song-name">{{ store.musicTrack.music_tracks.title }}</span>
                        <span class="artist-name">{{ store.musicTrack.artist.name }}</span>
                    </div>
                </div>
                <div class="d-flex gap-3 col-4 align-items-center justify-content-center">
                    <button class="btn-icon" @click="prev">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-name="Layer 1" width="24"
                            height="24">
                            <path
                                d="m22 12c0 6.732-.913 10.137-.951 10.279-.14.513-.64.817-1.126.694-.122-.03-3.049-.792-7.877-4.198-4.633-3.269-6.631-5.87-6.844-6.156-.135-.181-.202-.4-.202-.619s.067-.437.202-.619c.213-.286 2.211-2.887 6.844-6.156 4.827-3.406 7.754-4.168 7.877-4.198.493-.123.985.182 1.126.694.039.142.951 3.547.951 10.279zm-17.094-10.935c-.792-.242-1.631.204-1.873.996-.042.138-1.033 3.456-1.033 9.938s.991 9.8 1.033 9.938c.239.798 1.099 1.235 1.868.995.791-.239 1.239-1.076 1.002-1.868-.009-.03-.904-3.09-.904-9.066s.895-9.036.902-9.062c.242-.792-.204-1.631-.996-1.873z" />
                        </svg>
                    </button>
                    <button class="btn-icon" @click="playSong">
                        <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                            height="24">
                            <path
                                d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0Z" />
                            <path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0Z" />
                        </svg>
                    </button>
                    <button class="btn-icon" @click="next">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-name="Layer 1" width="24"
                            height="24">
                            <path
                                d="m18.797 11.38c.135.182.203.401.203.62s-.068.438-.203.62c-.214.287-2.223 2.894-6.844 6.154-4.827 3.406-7.754 4.168-7.877 4.198-.486.124-.986-.181-1.126-.694-.039-.142-.951-3.547-.951-10.279s.914-10.136.952-10.278c.14-.513.633-.821 1.126-.694.122.03 3.049.792 7.877 4.198 4.621 3.26 6.63 5.868 6.844 6.154zm2.169-9.318c-.241-.79-1.072-1.238-1.868-.995-.791.239-1.239 1.076-1.002 1.868.009.03.903 3.09.903 9.066s-.89 9.017-.903 9.065c-.239.791.206 1.627.997 1.869.771.242 1.633-.196 1.873-.996.042-.138 1.033-3.456 1.033-9.938s-.991-9.8-1.033-9.938z" />
                        </svg>
                    </button>
                </div>
                <div class="d-flex align-items-center col-4 justify-content-end">
                    <input v-model="store.volume" class="volumn-custom" type="range" min="0" :max="100" step="0.1"
                        @input="setVolume" />
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.app-footer {
    background-color: #121212;
    position: fixed;
    bottom: 0px;
    width: calc(100vw);
    height: 84px;
    z-index: 1001;
}

.btn-icon {
    border-radius: 50%;
    background-color: white;
    border: 1px solid #ccc;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
}

.volumn-custom {
    width: 80px;
}

.song-name {
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    text-align: left;
}

.artist-name {
    color: #ffffff;
    font-size: 12px;
    text-align: left;
}

.seek-custom {
    width: 100vw;
    height: 4px;
    border-radius: 2px;
    background: #d3d3d3;
    outline: none;
    -webkit-transition: .2s;
    transition: opacity .2s;
    position: fixed;
    z-index: 1002;
}

.img-container {
    height: 48px;
    width: 48px;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    align-items: center;
}

@media (min-width: 768px) {
    .volumn-custom {
        width: 120px;
    }
}

@media (max-width: 905px) {
    .song-name {
        font-size: 18px;
    }

    .artist-name {
        font-size: 12px;
    }

    .img-container {
        height: 36px;
        width: 36px;
    }

    .app-footer {
        width: 100%;
    }

    .seek-custom {
        left: 0px;
    }
}

@media (max-width: 460px) {
    .song-name {
        font-size: 14px;
    }

    .artist-name {
        font-size: 10px;
    }

    .img-container {
        height: 36px;
        width: 36px;
    }
}

.album-img {
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    width: 100%;
}
</style>