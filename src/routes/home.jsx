// core components/views
import Home from "views/Home/Home";
import Login from "views/Login/Login";
import Register from "views/Register/Register";

const homeRoutes = [
  {
    path: "/home",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

export default homeRoutes;
