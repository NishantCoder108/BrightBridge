import { useEffect, useState } from "react";
import { getAllCourses } from "../../../api/services/adminCourseService";
import CourseCard from "../../common/CourseCard";
import { ICourseCard } from "../../../interfaces/courseInterface";

const AdminAllCourse = () => {
    const [courses, setCourses] = useState([]);

    const [errCourse, setErrcourse] = useState("");
    const fetchAllCourse = async () => {
        try {
            const courses = await getAllCourses();

            console.log({ courses });

            setCourses(courses);
        } catch (error) {
            if (error instanceof Error) {
                setErrcourse(error.message);
            }
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllCourse();
    }, []);

    console.log({ courses });
    return (
        <div>
            {!errCourse ? (
                <div className="flex flex-wrap items-start py-6 gap-6 justify-evenly">
                    {courses.length > 0 &&
                        courses.map((course) => {
                            const {
                                courseId,
                                title,
                                imageurl,
                                description,
                                price,
                                _id,
                            } = course as ICourseCard;

                            return (
                                <CourseCard
                                    key={courseId}
                                    courseId={_id}
                                    title={title}
                                    imageurl={imageurl}
                                    description={description}
                                    price={price}
                                />
                            );
                        })}
                </div>
            ) : (
                <div>{errCourse}</div>
            )}
        </div>
    );
};

export default AdminAllCourse;
