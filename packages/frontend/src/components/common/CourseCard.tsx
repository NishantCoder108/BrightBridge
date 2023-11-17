import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import VideoPlayer from "../pages/VideoPlayerPage";

interface CourseCardProps {
  title: string;
  imageUrl: string;
  description: string;
  instructor: string;
  price: string;
  handleVideo: (watchNowHandler: () => void) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  imageUrl,
  description,
  instructor,
  price,
  handleVideo,
}) => {
  const isToken = useSelector((state: RootState) => state.course.token);
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imageUrl} alt={`Image of ${title}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className=" ">{description}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {instructor}
        </span>
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {price}
        </span>
      </div>
      <div className="px-6 pb-4">
        {!isToken ? (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Enroll Now
          </Link>
        ) : (
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            variant="gradient"
            size="small"
          >
            <VideoPlayer handleVideo={handleVideo} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
