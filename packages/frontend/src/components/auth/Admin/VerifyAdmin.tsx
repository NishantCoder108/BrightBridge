/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
// import axiosInstance from "../../../api/axiosInstance";
import { useEffect, useState } from "react";
import { verifyAdmin } from "../../../api/services/adminService";
import { useDispatch } from "react-redux";
import { setVerifiedToken } from "../../../redux/slices/verifySlice";
import { clearToken } from "../../../redux/slices/authSlice";
// import { setVerifiedToken } from "../../../redux/slices/verifySlice";
// import { useDispatch } from "react-redux";

const VerifyAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const currUser = localStorage.getItem("currentUser");

    // const
    // useEffect(() => {
    //     if (currUser) {
    //         const verifyAdmin = verifyAdmin();
    //         if (verifyAdmin.role === "ADMIN") {
    //             setIsAdmin(true);
    //         } else {
    //             setIsAdmin(false);
    //         }
    //     }
    // }, [currUser]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchVerifyAdmin = async () => {
        setIsLoading(true);
        try {
            const response = await verifyAdmin();
            console.log({ response });

            if (response && response.status === 200 && response.data) {
                setIsLoading(false);
                if (response.data.role === "ADMIN") {
                    setIsAdmin(true);
                    dispatch(setVerifiedToken(true));
                    navigate("/home", { replace: true });
                } else {
                    setIsAdmin(false);

                    dispatch(clearToken());
                    navigate("/", { replace: true });
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.log({ error });
            setIsAdmin(false);

            dispatch(clearToken());
            navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        console.log("Navigating Calling...");

        if (currUser) {
            console.log("fetching verification...");
            fetchVerifyAdmin();
        } else {
            navigate("/", { replace: true });
        }
    }, [currUser]);

    console.log({ isAdmin });

    console.log({ isLoading });
    if (isLoading) {
        return <h1>Verifying Admin...</h1>;
    }

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
