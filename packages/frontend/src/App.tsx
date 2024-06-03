import AuthForm from "./components/auth/Admin/AuthForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./components/pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./types/themeTypes";
import HomePage from "./components/HomePage";
import VerifyAdmin from "./components/auth/Admin/VerifyAdmin";
import AdminHomePage from "./components/pages/Admin/AdminHomePage";
// import { RootState } from "@types/themeTypes";
function App() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    // const router = createBrowserRouter([
    //   {
    //     path: "/",
    //     element: (
    //       <div className={theme === "dark" ? "dark" : ""}>
    //         {" "}
    //         <HomePage />
    //       </div>
    //     ),
    //   },
    //   {
    //     path: "/login",
    //     element: <AuthForm />,
    //   },
    // ]);

    // return <RouterProvider router={router} />;

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route element={<VerifyAdmin />}>
                        <Route path="/home" element={<AdminHomePage />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
