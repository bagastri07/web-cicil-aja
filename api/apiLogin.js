import fetcher from "./fetcher";

const apiLogin = {
  postLogin: (data) =>
    fetcher
      .post("/auth/login", data)
      .then((resp) => resp.data)
      .catch((err) => err),

  postRegist: (data) =>
    fetcher
      .post("/borrowers/create", data)
      .then((resp) => resp.data)
      .catch((err) => err),
};

export default apiLogin;
