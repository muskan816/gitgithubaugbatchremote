import { videos } from "../data/mockData";

export const fetchVideos = () => {
  return new Promise((resolve, reject) => {
    if (videos.length > 0) resolve(videos);
    else reject("no videos found");
  });
};
