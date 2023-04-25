import Dashboard from "../../../public/Image/Icons/svgs/Dashboard.svg";
import Agents from "../../../public/Image/Icons/svgs/Agents.svg";

const adminMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
  { id: 1, text: "Agents", link: "/agents", svg: Agents },
  { id: 1, text: "Invoices", link: "/invoices", svg: Agents },
  { id: 1, text: "Sales", link: "/sales", svg: Agents },
  { id: 1, text: "Clients", link: "/clients", svg: Agents },
  { id: 1, text: "Tasks", link: "/tasks", svg: Agents },
];

const agentMenu = [
  { id: 0, text: "Dashboard", link: "/", svg: Dashboard },
  { id: 1, text: "Invoices", link: "/invoices", svg: Agents },
  { id: 1, text: "Sales", link: "/sales", svg: Agents },
  { id: 1, text: "Tasks", link: "/tasks", svg: Agents },
];

export {adminMenu,agentMenu}