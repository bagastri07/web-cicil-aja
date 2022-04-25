import apiLogin from "./apiLogin";
import apiUser from "./apiUser";
import apiTicket from "./apiTicket";
import apiAdmin from "./apiAdmin";

const API = {
  ...apiLogin,
  ...apiUser,
  ...apiTicket,
  ...apiAdmin,
};

export default API;
