
import { HomeIcon, UserGroupIcon, DocumentTextIcon, ChartBarIcon, RectangleStackIcon, Cog6ToothIcon, UsersIcon } from "@heroicons/react/24/outline";

const adminMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: HomeIcon },
  { id: 1, text: "Team", link: "/team", svg: UserGroupIcon },
  { id: 2, text: "Invoices", link: "/invoice", svg: DocumentTextIcon },
  { id: 3, text: "Sales", link: "/sales", svg: ChartBarIcon },
  { id: 4, text: "Clients", link: "/clients", svg: UsersIcon },
  { id: 5, text: "Tasks", link: "/tasks", svg: RectangleStackIcon },
  { id: 6, text: "Settings", link: "/setting", svg: Cog6ToothIcon },
];

const agentMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: HomeIcon },
  { id: 1, text: "Invoices", link: "/invoices", svg: HomeIcon },
  { id: 1, text: "Sales", link: "/sales", svg: HomeIcon },
  { id: 1, text: "Tasks", link: "/tasks", svg: HomeIcon },
];

export {adminMenu,agentMenu}