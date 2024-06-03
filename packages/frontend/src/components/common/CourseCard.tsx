import React from "react";
import { ICourseCard } from "../../interfaces/courseInterface";

const CourseCard: React.FC<ICourseCard> = ({
    title,
    imageurl,
    description,
    instructor,
    price,
}) => {
    console.log({ imageurl });
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg ">
            {imageurl && (
                <img
                    className="w-full"
                    src={imageurl}
                    alt={`Image of ${title}`}
                />
            )}{" "}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className=" ">{description}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {instructor || "Nishant Js"}
                </span>
                <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {price}
                </span>
            </div>
        </div>
    );
};

export default CourseCard;
