import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../common/Modal";
import { RootState } from "../../redux/store";
import videoUrlL from "../../assets/Jai_shree_ram.mp4";
// interface RootState {
//   auth: {
//     isAuthenticated: boolean;
//   };
//   // Define other state types if needed
// }

interface VideoPlayerProps {
  handleVideo: (watchNowHandler: () => void) => void;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ handleVideo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = useSelector((state: RootState) => state.course.token);

  const fetchVideo = async () => {
    setLoading(true);
    // Fetch video data from API
    // const url: string = await getVideoUrlFromApi(); // Replace with actual API call
    setVideoUrl(videoUrlL); // Example URL
    setLoading(false);
  };

  const handleWatchNow = () => {
    if (!isAuthenticated) {
      alert("Please log in to watch the video.");
      return;
    }
    fetchVideo();
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={() => handleVideo(handleWatchNow)}>Watch Now</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {loading ? <p>Loading...</p> : <video src={videoUrl} controls />}
      </Modal>
    </>
  );
};

export default VideoPlayer;
