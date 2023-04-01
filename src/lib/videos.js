//import videoData from "@/data/videos.json";
import { getWatchedAgain, getMyListVideo } from "@/lib/db/hasura";

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = `${process.env.YOUTUBE_DOMAIN_URL}/youtube/v3`;
  try {
    const response = await fetch(
      `${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data?.error) {
      console.log("Some thing error:", data.error?.message);
      return [];
    }
    return data?.items?.map((item) => {
      const snippet = item?.snippet;
      return {
        title: snippet?.title,
        imgUrl: `https://i.ytimg.com/vi/${item?.id?.videoId}/maxresdefault.jpg`,
        id: item?.id?.videoId || item?.id,
        description: snippet?.description,
        publishTime: snippet?.publishedAt,
        channelTitle: snippet?.channelTitle,
        viewCount: item?.statistics?.viewCount || "",
      };
    });
  } catch (error) {
    console.log("Some thing error:", error);
  }
};

export const getVideos = async (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;
  return getCommonVideos(URL);
};

export const getVideoById = async (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

export const getWatchedAgainVideo = async (userId, token) => {
  const res = await getWatchedAgain(userId, token);
  return res.map((video) => ({
    id: video.videoId,
    imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
  }));
};

export const getMyList = async (userId, token) => {
  const res = await getMyListVideo(userId, token);
  return res.map((video) => ({
    id: video.videoId,
    imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
  }));
};
