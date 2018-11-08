// @material-ui/icons
import Ticket from "@material-ui/icons/Email";
import Chat from "@material-ui/icons/Forum";
import Timeline from "@material-ui/icons/Timeline";
import Member from "@material-ui/icons/Person";
// core components/views
import MailTicket from "views/MailTicket/MailTicket";
import LiveChat from "views/LiveChat/LiveChat";
import Reporting from "views/Reporting/Reporting";
import NewTicket from 'views/MailTicket/NewMailTicket';
import User from "../views/User/User";
import EditUser from "../views/User/EditUser";
const agentRoutes = [
  {
    path: "/agent/ticket",
    sidebarName: "Ticket",
    navbarName: "Mail ticket",
    icon: Ticket,
    component: MailTicket
  },
  {
    path: "/agent/chat",
    sidebarName: "Chat",
    navbarName: "Live chat",
    icon: Chat,
    component: LiveChat
  },
  {
    path: "/agent/member",
    sidebarName: "Thành viên",
    navbarName: "Thành viên",
    icon: Member,
    component: User
  },
  {
    path: "/agent/reporting",
    sidebarName: "Báo cáo",
    navbarName: "Báo cáo",
    icon: Timeline,
    component: Reporting
  },
  { redirect: true, path: "/agent", to: "/agent/ticket", navbarName: "Mail ticket" }
];

export default agentRoutes;
