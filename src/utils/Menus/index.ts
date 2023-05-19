import Dashboard from "../../../public/Image/Icons/svgs/Dashboard.svg";
import Agents from "../../../public/Image/Icons/svgs/Agents.svg";

const adminMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
  { id: 1, text: "Team", link: "/team", svg: Agents },
  { id: 1, text: "Invoices", link: "/invoice", svg: Agents },
  { id: 1, text: "Sales", link: "/sales", svg: Agents },
  { id: 1, text: "Clients", link: "/clients", svg: Agents },
  { id: 1, text: "Tasks", link: "/tasks", svg: Agents },
  { id: 1, text: "Info", link: "/info", svg: Agents },
];

const agentMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
  { id: 1, text: "Invoices", link: "/invoices", svg: Agents },
  { id: 1, text: "Sales", link: "/sales", svg: Agents },
  { id: 1, text: "Tasks", link: "/tasks", svg: Agents },
];

export {adminMenu,agentMenu}