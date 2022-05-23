import fetcher from "./fetcher";

const apiBill = {
  getBill: (token) =>
    fetcher
      .get("/loan-bills", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getPaidBill: (token) =>
    fetcher
      .get("/loan-bills?status=paid", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getUnpaidBill: (token) =>
    fetcher
      .get("/loan-bills?status=unpaid", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  patchBill: (id, token) =>
    fetcher
      .patch(`/loan-bills/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),
};

export default apiBill;
