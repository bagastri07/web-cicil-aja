import fetcher from "./fetcher";

const apiUser = {
  getUser: (token) =>
    fetcher
      .get("/borrowers", { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => resp.data)
      .catch((err) => err.message),
};

export default apiUser;
