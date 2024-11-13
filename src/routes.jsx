import {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, DataManagement, InventoryManagement } from "@/pages/dashboard";

import { Login } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <AdjustmentsHorizontalIcon {...icon} />,
        name: "data Management",
        path: "/data-management",
        element: <DataManagement />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "inventory management",
        path: "/inventory-management",
        element: <InventoryManagement />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftOnRectangleIcon  {...icon} />,
        name: "logout",
        path: "/login",
        element: <Login/>,
      },
    ],
  },
];

export default routes;
