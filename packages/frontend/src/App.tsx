import AuthForm from "./components/auth/AuthForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./types/themeTypes";
// import { RootState } from "@types/themeTypes";
function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className={theme === "dark" ? "dark" : ""}>
          {" "}
          <HomePage />
        </div>
      ),
    },
    {
      path: "/login",
      element: <AuthForm />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
