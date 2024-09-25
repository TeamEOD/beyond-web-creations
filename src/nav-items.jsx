import { HomeIcon, DollarSignIcon, FileTextIcon, TrendingUpIcon } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Budget",
    to: "/budget",
    icon: <DollarSignIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Bills",
    to: "/bills",
    icon: <FileTextIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Investments",
    to: "/investments",
    icon: <TrendingUpIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
