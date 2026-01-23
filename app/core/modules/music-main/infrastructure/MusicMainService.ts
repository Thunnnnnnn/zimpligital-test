import api from "~/utils/http";

const getAllArtist = async () => {
  const response = await api.get("/artist");
  return response;
};

const getArtistById = async (id: number) => {
  const response = await api.get(`/artist/${id}`);
  return response;
};

const getAllMusicTracks = async (badge?: number) => {
  const response = await api.get(
    badge ? "/music-track?categoriesMusicId=" + badge : "/music-track",
  );
  return response;
};

const getMusicTrackById = async (id: number) => {
  const response = await api.get(`/music-track/${id}`);
  return response;
};

const getAllCategoriesMusic = async () => {
  const response = await api.get("/categories-music");
  return response;
};

export {
  getAllArtist,
  getArtistById,
  getAllMusicTracks,
  getMusicTrackById,
  getAllCategoriesMusic,
};
