import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { LuIndianRupee } from "react-icons/lu";
import { PiDotsThreeBold } from "react-icons/pi";
import { useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";

const VideoCard = ({ video }) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [followed, setFollowed] = useState(false);

  const format = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "m";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num?.toString();
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleFollow = () => {
    setFollowed((prev)=> !prev)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        src={video.videoUrl}
        muted={muted}
        ref={videoRef}
        autoPlay
        loop
        playsInline
        className="h-full w-full object-cover py-4"
        onClick={handleMute}
      />

      {/* Left Overlay */}
      <div className="absolute bottom-14 left-4 text-white w-2/3 space-y-1">
        <div className="flex gap-2 font-bold">
          <span className="text-yellow-500 text-xl">#</span>
          <p>Startup India</p>
          <button>
            <CiSquarePlus size={25} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={video.userImage}
            alt="creator"
            className="w-10 h-10 rounded-full border-2"
          />
          <p className="font-semibold">{video.userName}</p>
          <button
            onClick={handleFollow}
            className={`transition-all duration-300 ease-in-out font-semibold border px-2 py-[2px] rounded-[0.40rem] ${
              followed
                ? "bg-white text-black border-white scale-105"
                : "text-white border"
            }`}
          >
            {followed ? "Following" : "Follow"}
          </button>
        </div>
        <p className="font-medium">{video.title}</p>
        <p className="text-sm line-clamp-3">{video.description}</p>
      </div>

      {/* Right Overlay */}
      <div className="absolute bottom-28 right-4 space-y-2 text-white flex flex-col items-center justify-center text-sm">
        <button
          onClick={handleLike}
          className="flex flex-col items-center transition-transform duration-300 ease-in-out"
        >
          <IoMdHeartEmpty
            size={30}
            className={`cursor-pointer ${
              liked ? "fill-red-700 scale-125" : "scale-100"
            } transition-all duration-300`}
          />
          <span>{format(likes)}</span>
        </button>
        <p>
          <FaRegComment size={25} className="cursor-pointer" />
          {format(video.comments)}
        </p>
        <p>
          <IoPaperPlaneOutline size={25} className="cursor-pointer" />
          {format(video.shares)}
        </p>
        <p>
          <LuIndianRupee size={25} className="cursor-pointer" />
          {format(video.earnings)}
        </p>
        <p>
          <PiDotsThreeBold size={25} className="cursor-pointer" />
        </p>
        <p className="border px-2 font-medium border-yellow-300 text-yellow-500 tracking-wide rounded-sm">
          {video.isPaid ? "Paid" : "Free"}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
