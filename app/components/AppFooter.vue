<script lang="ts" setup>
import { useMusicMainStore } from '~/core/modules/music-main/store/musicMainStore'


const isPlaying = ref(false)
const store = useMusicMainStore()
const player = ref<any | null>(null)
const isMute = ref(false)
const volume = ref(0)
const firstMount = ref(true)

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

const mute = () => {
    if (isMute.value) {
        const vol = volume.value / 100
        player.value.setVolume(vol)
        store.volume = volume.value
    } else {
        volume.value = store.volume
        player.value.setVolume(0)
        store.volume = 0
    }
    isMute.value = !isMute.value
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

function formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00'

    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)

    return `${mins}:${secs.toString().padStart(2, '0')}`
}

watch(
    () => store.musicId,
    () => {
        console.log('musicId changed in footer:', store.musicId)
        if (firstMount.value) {
            firstMount.value = false
            return
        }
        isPlaying.value = true
        setTimeout(() => {
            player.value.play()
        }, 500)
    }
)


onMounted(async () => {
    await store.getAllMusicTracks();

    if (store.musicTracks.length > 0) {
        store.musicId = store.musicTracks[0]!.music_tracks.id;
        store.musicTrack = store.musicTracks[0]!;
    }
})
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
                <div class="d-flex align-items-center col-4 justify-content-end gap-3">
                    <div class="d-flex gap-1 text-white ">
                        <div class="time">
                            {{ formatTime(store.currentTime) }}
                            /
                            {{ formatTime(store.duration) }}</div>
                    </div>
                    <svg v-if="!isMute" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="24"
                        height="24" fill="white" style="cursor: pointer;" @click="mute">
                        <path
                            d="M20.807,4.29a1,1,0,0,0-1.415,1.415,8.913,8.913,0,0,1,0,12.59,1,1,0,0,0,1.415,1.415A10.916,10.916,0,0,0,20.807,4.29Z" />
                        <path
                            d="M18.1,7.291A1,1,0,0,0,16.68,8.706a4.662,4.662,0,0,1,0,6.588A1,1,0,0,0,18.1,16.709,6.666,6.666,0,0,0,18.1,7.291Z" />
                        <path
                            d="M13.82.2A12.054,12.054,0,0,0,6.266,5H5a5.008,5.008,0,0,0-5,5v4a5.008,5.008,0,0,0,5,5H6.266A12.059,12.059,0,0,0,13.82,23.8a.917.917,0,0,0,.181.017,1,1,0,0,0,1-1V1.186A1,1,0,0,0,13.82.2ZM13,21.535a10.083,10.083,0,0,1-5.371-4.08A1,1,0,0,0,6.792,17H5a3,3,0,0,1-3-3V10A3,3,0,0,1,5,7h1.8a1,1,0,0,0,.837-.453A10.079,10.079,0,0,1,13,2.465Z" />
                    </svg>

                    <svg v-else xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                        width="24" height="24" fill="white" style="cursor: pointer;" @click="mute">
                        <path
                            d="m15.004,20.004v2.812c0,.297-.132.579-.36.769-.181.151-.407.231-.64.231-.061,0-.121-.005-.181-.017-2.999-.551-5.752-2.299-7.554-4.794h-1.27C2.242,19.004-.002,16.761-.002,14.002v-4.001C-.002,8.885.359,7.828,1.043,6.944c.34-.437.966-.516,1.403-.179.437.338.517.966.179,1.403-.41.529-.627,1.163-.627,1.832v4.001c0,1.655,1.347,3.002,3.002,3.002h1.78c.321,0,.622.154.811.414l.3.415c1.263,1.749,3.083,3.057,5.113,3.703v-1.532c0-.552.447-1,1-1s1,.448,1,1Zm8.703,3.703c-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l4.623,4.623C8.131,2.468,10.855.753,13.822.205c.293-.053.594.025.821.215.229.19.36.472.36.769v12.402l1.686,1.686c.846-.887,1.31-2.046,1.31-3.276,0-1.269-.494-2.461-1.392-3.359-.391-.39-.391-1.023,0-1.414s1.023-.391,1.414,0c1.275,1.275,1.978,2.97,1.978,4.773,0,1.764-.673,3.425-1.896,4.69l1.415,1.415c3.33-3.418,3.304-8.908-.081-12.292-.391-.391-.391-1.023,0-1.414.391-.391,1.023-.391,1.414,0,4.164,4.164,4.191,10.922.081,15.12l2.774,2.774c.391.391.391,1.023,0,1.414ZM7.762,6.348l5.242,5.242V2.468c-2.032.647-3.854,1.955-5.114,3.702l-.128.178Z" />
                    </svg>

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

    .time {
        display: none;
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