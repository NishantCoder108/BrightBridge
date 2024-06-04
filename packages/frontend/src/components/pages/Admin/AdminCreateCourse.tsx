import { useForm, SubmitHandler } from "react-hook-form";
import { createCourse } from "../../../api/services/adminCourseService";

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
}

interface IFormInput {
    firstName: string;
    gender: GenderEnum;
}

interface IProps {
    handleRefreshData: (data: boolean) => void;
    refreshData: boolean;
}
const AdminCreateCourse = ({ refreshData, handleRefreshData }: IProps) => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        // reset("firstName");

        try {
            const ddd = {
                imageurl:
                    "https://t4.ftcdn.net/jpg/01/17/48/95/360_F_117489540_elCLsL6KJwO3TvivV5n2NtGuUvR6RCEw.jpg",
                title: "One day ,You will be Billionaire",
                description:
                    "Practice makes one day succesfull person,Beliefing in yourself is very important aspects in life , so just your work with belief , that one day ,you will be succussfully. ",
                price: 9999,
                isPublished: false,
            };
            const response = await createCourse(ddd);

            console.log(response);

            if (response && response.status === 201 && response.data) {
                console.log(response.data);

                handleRefreshData(!refreshData);
            }
        } catch (error) {
            console.log("Creating course failed", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name</label>
                <input {...register("firstName")} />
                <label>Gender Selection</label>
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AdminCreateCourse;
