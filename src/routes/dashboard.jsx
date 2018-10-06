// @material-ui/icons
import Ticket from "@material-ui/icons/Email";
import Chat from "@material-ui/icons/Forum";
import Timeline from "@material-ui/icons/Timeline";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import MailTicket from "views/MailTicket/MailTicket";
import LiveChat from "views/LiveChat/LiveChat";
import Reporting from "views/Reporting/Reporting";

const dashboardRoutes = [
  {
    path: "/ticket",
    sidebarName: "Ticket",
    navbarName: "Mail ticket",
    icon: Ticket,
    component: MailTicket
  },
  {
    path: "/chat",
    sidebarName: "Chat",
    navbarName: "Live Chat",
    icon: Chat,
    component: LiveChat
  },
  {
    path: "/reporting",
    sidebarName: "Báo cáo",
    navbarName: "Báo cáo",
    icon: Timeline,
    component: Reporting
  },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
