import { useState } from "react";
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import AdminAllCourse from "./AdminAllCoursePage";
import AdminCreateCourse from "./AdminCreateCourse";

const AdminHomePage = () => {
    const [refreshData, setRefreshData] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleModal = () => {
        setOpenModal(!openModal);
    };

    const handleRefreshData = (data: boolean) => {
        setRefreshData(data);
    };
    return (
        <div>
            <h3>Admin Home Page</h3>

            <hr />
            <Modal
                isOpen={openModal}
                key={"admin_create_course_modal"}
                onClose={() => setOpenModal(false)}
                children={
                    <AdminCreateCourse
                        handleRefreshData={handleRefreshData}
                        refreshData={refreshData}
                    />
                }
            />

            <div className="flex flex-col items-center justify-end">
                <div className="flex items-center justify-end w-full pr-6 py-3">
                    <Button
                        onClick={handleModal}
                        className="border border-red-800 inline-block right-0 "
                        size="small"
                    >
                        Create
                    </Button>
                </div>

                <hr />
                <AdminAllCourse refreshData={refreshData} />
            </div>
        </div>
    );
};

export default AdminHomePage;
