import { useForm, SubmitHandler } from "react-hook-form";
import { createCourse } from "../../../api/services/adminCourseService";

interface IFormInput {
    imageurl?: string;
    title: string;
    description?: string;
    price: number;
    isPublished?: boolean;
}

interface IProps {
    handleRefreshData: (data: boolean) => void;
    refreshData: boolean;
}
const AdminCreateCourse = ({ refreshData, handleRefreshData }: IProps) => {
    const { register, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);

        try {
            const response = await createCourse(data);
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
                <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        {...register("title")}
                        placeholder="Create course title"
                        className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        {...register("description")}
                        placeholder="Create course description"
                        className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="number"
                        {...register("price")}
                        placeholder="Create course price"
                        className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageurl">Image Url</label>
                    <input
                        id="imageurl"
                        type="text"
                        {...register("imageurl")}
                        placeholder=" Image url "
                        className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="isPublished">Is Published</label>
                    <input
                        id="isPublished"
                        type="checkbox"
                        {...register("isPublished")}
                        placeholder="Create course price"
                        className="w-full px-4 py-2  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Submit
                </button>{" "}
                {/* {errResponse && (
                        <p className="text-red-500 text-xs text-center italic">
                            {errResponse}
                        </p>
                    )} */}
            </form>
        </div>
    );
};

export default AdminCreateCourse;
