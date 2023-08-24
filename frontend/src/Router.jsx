import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import EquipmentPage from "./pages/EquipmentPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import ProviderPage from "./pages/ProviderPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LogInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "location/:loc_id",
        element: <LocationPage />,
      },
      {
        path: "location/:loc_id/:eq_id",
        element: <EquipmentPage />,
      },
      {
        path: "user/:id",
        element: <UserPage />,
      },
      {
        path: "provider/:id",
        element: <ProviderPage />,
      },
    ],
  },
]);

export default router;
