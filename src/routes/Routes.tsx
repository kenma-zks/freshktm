import Characters from "@/pages/Characters";
import Dashboard from "@/pages/Dashboard";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/characters/:characterId",
    element: <Characters />,
  },
]);

export default router;
