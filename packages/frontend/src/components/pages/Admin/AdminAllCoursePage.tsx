import React, { useEffect, useState } from "react";
import { getAllCourses } from "../../../api/services/adminCourseService";

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
            {!errCourse ? <div>AdminAllCourse</div> : <div>{errCourse}</div>}
        </div>
    );
};

export default AdminAllCourse;
