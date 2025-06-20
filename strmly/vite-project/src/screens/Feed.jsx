// Feed.jsx
import { Suspense, lazy, useEffect, useState } from "react";
import { fetchVideos } from "../services/api.js";
import "../App.css";

const VideoCard = lazy(() => import("../components/VideoCard.jsx"));

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchVideos();
        setVideos(data);
      } catch (err) {
        setError("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="h-[95%] overflow-y-scroll snap-y snap-mandatory no-scrollbar w-screen flex flex-col items-center">
      {videos.map((vid) => (
        <div key={vid.id} className="snap-start h-[100%] w-[25rem] snap-child my-4">
          <Suspense
            fallback={
              <div className="text-center text-white">Loading Video...</div>
            }
          >
            <VideoCard video={vid} />
          </Suspense>
        </div>
      ))}
    </div>
  );
};

export default Feed;
