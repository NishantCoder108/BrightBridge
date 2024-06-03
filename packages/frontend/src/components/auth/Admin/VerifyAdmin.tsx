/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
// import axiosInstance from "../../../api/axiosInstance";
import { useEffect, useState } from "react";
// import { setVerifiedToken } from "../../../redux/slices/verifySlice";
// import { useDispatch } from "react-redux";

const VerifyAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    const currUser = localStorage.getItem("currentUser");

    useEffect(() => {
        if (currUser) {
            const verifyAdmin = JSON.parse(currUser);
            if (verifyAdmin.role === "ADMIN") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }, [currUser]);

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const fetchVerifyAdmin = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axiosInstance.post("/admin/me");
    //         console.log({ response });

    //         if (response.status === 200 && response.data) {
    //             if (response.data.role === "ADMIN") {
    //                 setIsAdmin(true);
    //                 dispatch(setVerifiedToken(true));
    //                 navigate("/home", { replace: true });
    //             } else {
    //                 setIsAdmin(false);
    //                 dispatch(setVerifiedToken(false));
    //                 navigate("/", { replace: true });
    //             }
    //             setIsLoading(false);
    //         }
    //     } catch (error) {
    //         setIsLoading(false);
    //         console.log({ error });
    //         navigate("/", { replace: true });
    //         setIsAdmin(false);
    //         dispatch(setVerifiedToken(false));
    //     }
    // };

    // useEffect(() => {
    //     fetchVerifyAdmin();
    // }, []);

    // console.log({ isAdmin });

    // if (isLoading) {
    //     return <h1>Verifying Admin...</h1>;
    // }

    return (
        <>
            {isAdmin ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <div>
                    <h1>
                        You are not authorized to view this page, please
                        <Link
                            to="/"
                            className="text-blue-900 font-bold underline"
                        >
                            {" "}
                            Login{" "}
                        </Link>
                    </h1>
                </div>
            )}
        </>
    );
};

export default VerifyAdmin;
