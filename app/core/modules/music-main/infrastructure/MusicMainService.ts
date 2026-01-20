import api from "~/utils/http";

const getAllArtist = async () => {
  const response = await api.get("/artist");
  return response;
};

const getArtistById = async (id: number) => {
  const response = await api.get(`/artist/${id}`);
  return response;
};

const getAllMusicTracks = async () => {
  const response = await api.get("/music-track");
  return response;
};

const getMusicTrackById = async (id: number) => {
  const response = await api.get(`/music-track/${id}`);
  return response;
};

export { getAllArtist, getArtistById, getAllMusicTracks, getMusicTrackById };
