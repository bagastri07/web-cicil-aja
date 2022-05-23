import fetcher from "./fetcher";

const apiUser = {
  getUser: (token) =>
    fetcher
      .get("/borrowers", { headers: { Authorization: `Bearer ${token}` } })
      .then((resp) => resp.data)
      .catch((err) => err.message),

  putUser: (data, token) =>
    fetcher
      .put("/borrowers", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  putBank: (data, token) =>
    fetcher
      .put("/borrowers/update-bank-information", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  postKtm: (data, token) =>
    fetcher
      .post("/borrowers/upload-ktm", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  postKtp: (data, token) =>
    fetcher
      .post("/borrowers/upload-ktp", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  patchPassword: (data, token) =>
    fetcher
      .patch("/borrowers/change-password", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),
};

export default apiUser;
