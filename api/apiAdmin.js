import fetcher from "./fetcher";

const apiAdmin = {
  postAdminLogin: (data) =>
    fetcher
      .post("/_admin/auth/login", data)
      .then((resp) => resp.data)
      .catch((err) => err),
};

export default apiAdmin;
