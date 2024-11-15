import "./App.css";
import DashboardPage from "./Pages/DashBoardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FacilityPage from "./Pages/FacilityPage";
import CoursePage from "./Pages/CoursePage";
import MainLayout from "./Layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />, 에러 페이지 들어가야함
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "course",
        element: <CoursePage />,
      },
      {
        path: "facility",
        element: <FacilityPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
