<script setup lang="ts">
import { usePlaylistMainStore } from '../../store/PlaylistMainStore';


const $bootstrap = useNuxtApp().$bootstrap;
const playlistName = ref('');
const store = usePlaylistMainStore();

const showModal = () => {
    const modalElement = document.getElementById('EditModal');
    if (modalElement) {
        const modal = new $bootstrap.Modal(modalElement);
        if (modal) {
            modal.show();
        }
    }
};

const hideModal = () => {
    const modalElement = document.getElementById('EditModal')
    if (!modalElement) return

    const modal = $bootstrap.Modal.getInstance(modalElement)
    modal?.hide()
}

const createPlaylist = async () => {

    if (playlistName.value.trim() === '') {
        useAlert({
            title: 'Error',
            text: 'Playlist name cannot be empty.',
            type: 'error',
            confirmButtonColor: '#1db954',
        });
        return;
    }

    const res = await store.postPlaylist(playlistName.value);

    if (res.status === 200) {
        useAlert({
            title: 'Success',
            text: 'Playlist created successfully.',
            type: 'success',
            confirmButtonColor: '#1db954',
        });
        playlistName.value = '';

    } else {
        useAlert({
            title: 'Error',
            text: 'Failed to create playlist.',
            type: 'error',
            confirmButtonColor: 'red',
        });
    }

    hideModal();
};

defineExpose({
    showModal,
    hideModal,
});
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="EditModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="EditModal">Edit Playlist</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <VTextInput v-model="playlistName" label="Playlist name" placeholder="Enter playlist" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="createPlaylist">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>