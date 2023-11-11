import AuthForm from "./components/auth/AuthForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <AuthForm />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
