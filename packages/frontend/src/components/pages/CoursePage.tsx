import React from "react";
import CourseCard from "../common/CourseCard";
import imageUrl from "../../assets/react_learn.png";
import nextImg from "../../assets/nextjs.webp";
import javaScriptImg from "../../assets/js.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const CoursePage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div
      className={`p-8 items-start justify-evenly flex flex-wrap gap-3 h-[95vh] ${
        theme === "dark" ? "bg-gray-600 " : "bg-[#f2eeee1f] text-gray-600"
      } text-${theme === "dark" ? "white" : "gray-400"}`}
    >
      <CourseCard
        title="React.js"
        imageUrl={imageUrl}
        description="A comprehensive guide to mastering React. Perfect for beginners and experts alike."
        instructor="Nishant | Js"
        price="Free"
      />
      <CourseCard
        title="Next.js"
        imageUrl={nextImg}
        description="Explore Next.js: Elevate your web development with React's powerful, production-ready framework."
        instructor="Nishant | Js"
        price="Free"
      />
      <CourseCard
        title="JavaScript"
        imageUrl={javaScriptImg}
        description="Uncover the power of JavaScript: Learn to craft dynamic, interactive web experiences with this foundational programming language."
        instructor="Amit Kumar"
        price="₹150"
      />
    </div>
  );
};

export default CoursePage;
