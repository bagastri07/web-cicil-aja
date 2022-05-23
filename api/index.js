import apiLogin from "./apiLogin";
import apiUser from "./apiUser";
import apiTicket from "./apiTicket";
import apiAdmin from "./apiAdmin";
import apiBill from "./apiBill";
import apiAmbassador from "./apiAmbassador";

const API = {
  ...apiLogin,
  ...apiUser,
  ...apiTicket,
  ...apiAdmin,
  ...apiBill,
  ...apiAmbassador,
};

export default API;
