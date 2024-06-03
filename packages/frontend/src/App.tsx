import AuthForm from "./components/auth/Admin/AuthForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import HomePage from "./components/pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./types/themeTypes";
import VerifyAdmin from "./components/auth/Admin/VerifyAdmin";
import AdminHomePage from "./components/pages/Admin/AdminHomePage";
function App() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    console.log({ theme });
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route element={<VerifyAdmin />}>
                        <Route path="/home" element={<AdminHomePage />} />
                    </Route>

                    <Route
                        path="*"
                        element={
                            <div className="flex items-center flex-col h-screen w-full justify-center ">
                                <h1>404 Page Not Found</h1>
                                <p>
                                    The page you are looking for does not exist
                                </p>
                                <p>
                                    {" "}
                                    <Link
                                        to="/"
                                        className="text-blue-800 font-semibold underline"
                                    >
                                        Please Login{" "}
                                    </Link>{" "}
                                </p>{" "}
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
