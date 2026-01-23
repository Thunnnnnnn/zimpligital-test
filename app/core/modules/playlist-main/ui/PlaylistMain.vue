<script setup lang="ts">
import { usePlaylistMainStore } from '../store/PlaylistMainStore';
import CreatePlaylistModal from './modal/CreatePlaylistModal.vue';
import EditPlaylistModal from './modal/EditPlaylistModal.vue';

const store = usePlaylistMainStore();
const headers = ref([
    { key: 'no', label: 'No.', width: '60px' },
    { key: 'name', label: 'Name' },
    { key: 'actions', label: 'Actions', width: '60px' },
    // { key: 'description', label: 'Description' },
]);

const refCreateModal = ref();
const refEditModal = ref();

onMounted(async () => {
    await store.getAllPlaylists();
});

const deletePlaylist = async (id: number) => {
    useAlert({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red',
        cancelButtonText: 'No',
        async callBack() {
            const res = await store.deletePlaylist(id);

            if (res.status === 200) {
                useAlert({
                    title: 'Deleted!',
                    text: 'Your playlist has been deleted.',
                    type: 'success',
                    confirmButtonColor: '#1db954',
                });
            }
        },
    })

    await store.getAllPlaylists();
};

const playPlaylist = async (id: number) => {
    await store.getMusicPlaylistById(id);
};

const createPlaylist = () => {
    refCreateModal.value.showModal()
};

const editPlaylist = (id: number) => {
    refEditModal.value.showModal()
};
</script>
<template>
    <div class="mt-4 container-fluid">
        <div class="row">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h3 class="text-white fw-bold">
                    Playlists
                </h3>

                <button class="create-playlist" @click="createPlaylist">
                    Create New Playlist
                </button>
            </div>

            <div class="col-12 mt-4">
                <VDatatable :headers="headers" :items="store.playlists" :is-show-header="false">
                    <template #item-no="{ index }">
                        {{ index + 1 }}.
                    </template>

                    <template #item-name="{ item }">
                        {{ item.name }}
                    </template>
                    <template #item-actions="{ item }">
                        <div class="d-flex">
                            <button class="btn-play" @click="playPlaylist(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path
                                        d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z" />
                                </svg>
                            </button>
                            <button class="btn-edit" @click="editPlaylist(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16"
                                    height="16">
                                    <path
                                        d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z" />
                                </svg>
                            </button>
                            <button class="btn-delete" @click="deletePlaylist(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;" xml:space="preserve" width="16"
                                    height="16">
                                    <g>
                                        <path
                                            d="M448,85.333h-66.133C371.66,35.703,328.002,0.064,277.333,0h-42.667c-50.669,0.064-94.327,35.703-104.533,85.333H64   c-11.782,0-21.333,9.551-21.333,21.333S52.218,128,64,128h21.333v277.333C85.404,464.214,133.119,511.93,192,512h128   c58.881-0.07,106.596-47.786,106.667-106.667V128H448c11.782,0,21.333-9.551,21.333-21.333S459.782,85.333,448,85.333z    M234.667,362.667c0,11.782-9.551,21.333-21.333,21.333C201.551,384,192,374.449,192,362.667v-128   c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333V362.667z M320,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333v-128c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M174.315,85.333c9.074-25.551,33.238-42.634,60.352-42.667h42.667   c27.114,0.033,51.278,17.116,60.352,42.667H174.315z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </template>
                </VDatatable>
            </div>
        </div>
    </div>

    <CreatePlaylistModal ref="refCreateModal" />
    <EditPlaylistModal ref="refEditModal" />
</template>

<style scoped>
.create-playlist {
    background-color: #ffffff;
    border: none;
    color: #121212;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
}

.btn-edit {
    background-color: #1db954;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 50%;
    width: 24px;
    height: 24px;

    svg {
        fill: white;
    }
}

.btn-edit:hover {
    background-color: #1db95460;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 50%;
    width: 24px;
    height: 24px;

    svg {
        fill: white;
    }
}


.btn-delete {
    /* background-color: #e02424; */
    background-color: #181818;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    cursor: pointer;
    border-radius: 50%;
    width: 24px;
    height: 24px;

    svg {
        fill: white;
    }
}

.btn-delete:hover {
    background-color: #18181860;
}

.btn-play {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
</style>