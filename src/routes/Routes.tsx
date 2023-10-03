import Characters from "@/pages/Characters";
import Chart from "@/pages/Chart";
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
  {
    path: "/chart",
    element: <Chart />,
  },
]);

export default router;
