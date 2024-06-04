import { memo, useEffect, useState } from "react";
import { getAllCourses } from "../../../api/services/adminCourseService";
import CourseCard from "../../common/CourseCard";
import { ICourseCard } from "../../../interfaces/courseInterface";

interface IProps {
    refreshData: boolean;
}
const AdminAllCourse = memo(({ refreshData }: IProps) => {
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
    }, [refreshData]);

    console.log({ courses });
    return (
        <div>
            {!errCourse ? (
                <div className="flex flex-wrap items-start py-6 gap-6 justify-evenly">
                    {courses.length > 0 &&
                        courses.map((course) => {
                            const { title, imageurl, description, price, _id } =
                                course as ICourseCard;

                            return (
                                <CourseCard
                                    key={_id}
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
});

export default AdminAllCourse;
