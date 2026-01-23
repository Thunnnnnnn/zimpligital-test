import api from "~/utils/http";

const getAllPlaylists = async (badge?: number) => {
  const response = await api.get("/playlist");
  return response;
};

const deletePlaylistById = async (id: number) => {
  const response = await api.delete(`/playlist/${id}`);
  return response;
};

const updatePlaylistById = async (id: number, data: any) => {
  const response = await api.put(`/playlist/${id}`, data);
  return response;
};

const getMusicPlaylistById = async (id: number) => {
  const response = await api.get(`/playlist-track/${id}`);
  return response;
};

const postMusicPlaylistTrack = async (data: any) => {
  const response = await api.post("/playlist-track", data);
  return response;
};

const postMusicPlaylist = async (data: string) => {
  const response = await api.post("/playlist", { name: data });
  return response;
};

export {
  getAllPlaylists,
  deletePlaylistById,
  updatePlaylistById,
  getMusicPlaylistById,
  postMusicPlaylist,
  postMusicPlaylistTrack,
};
