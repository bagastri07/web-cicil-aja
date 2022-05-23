import fetcher from "./fetcher";

const apiAmbassador = {
  getAllLoan: (token) =>
    fetcher
      .get("/_ambassador/loan-tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getLoanById: (id, token) =>
    fetcher
      .get(`/_ambassador/loan-tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  patchLoan: (id, token) =>
    fetcher
      .patch(`/_ambassador/loan-tickets/${id}/reviewed`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getCommission: (token) =>
    fetcher
      .get("_ambassador/commissions/balance-detail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAllBorrower: (id, token) =>
    fetcher
      .get(`/_ambassador/borrowers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),
};

export default apiAmbassador;
