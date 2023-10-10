import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ChartBarIcon,
  RectangleStackIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

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
  { id: 1, text: "Invoices", link: "/invoices", svg: DocumentTextIcon },
  { id: 1, text: "Sales", link: "/sales", svg: ChartBarIcon },
  { id: 1, text: "Tasks", link: "/tasks", svg: RectangleStackIcon },
];

const settingMenu = [
  {
    id: 0,
    title: "Account",
    menu: [
      {
        id: 0,
        label: "Profile account",
      },
      { id: 1, label: "Company account" },
    ],
  },
  {
    id: 1,
    title: "Security & Privacy",
    menu: [
      {
        id: 0,
        label: "Reset email",
      },
      { id: 1, label: "Reset password" },
      { id: 2, label: "Delete account" },
    ],
  },
  {
    id: 1,
    title: "Option sets",
    menu: [
      {
        id: 0,
        label: "Create options",
      },
    ],
  },
];

export { adminMenu, agentMenu, settingMenu };
