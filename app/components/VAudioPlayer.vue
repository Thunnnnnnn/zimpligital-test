<script setup lang="ts">
import { useMusicMainStore } from '~/core/modules/music-main/store/musicMainStore'

const store = useMusicMainStore()
const audio = ref<HTMLAudioElement | null>(null)

const play = () => {
    audio.value?.play()
}
const pause = () => {
    audio.value?.pause()
}
const setSrc = (src: string) => {
    if (!audio.value) return
    audio.value.src = src
}
const setVolume = (v: number) => {
    if (audio.value) audio.value.volume = v
}

const seek = (time: number) => {
    if (audio.value) audio.value.currentTime = time
}

onMounted(() => {
    if (!audio.value) return

    audio.value!.addEventListener('loadedmetadata', () => {
        store.duration = audio.value!.duration
    })

    audio.value.addEventListener('timeupdate', () => {
        if (!store.seeking) {
            store.currentTime = audio.value!.currentTime
        }
    })
})

defineExpose({
    play,
    pause,
    setSrc,
    setVolume,
    seek,
})
</script>

<template>
    <audio v-if="store.musicId !== 0" ref="audio" style="display: none;" controls
        :src="`/api/audio/${store.musicId}`" />
</template>