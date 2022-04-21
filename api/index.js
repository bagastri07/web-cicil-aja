import apiLogin from "./apiLogin";
import apiUser from "./apiUser";
import apiTicket from "./apiTicket";

const API = {
  ...apiLogin,
  ...apiUser,
  ...apiTicket,
};

export default API;
