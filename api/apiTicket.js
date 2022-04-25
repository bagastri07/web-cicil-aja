import fetcher from "./fetcher";

const apiTicket = {
  postTicket: (data, token) =>
    fetcher
      .post("/loan-tickets", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  getTicket: (token) =>
    fetcher
      .get("/loan-tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getTicketPending: (token) =>
    fetcher
      .get("/loan-tickets?status=pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  getDetailTicket: (id, token) =>
    fetcher
      .get(`/loan-tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  delTicket: (id, token) =>
    fetcher
      .delete(`/loan-tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),
};

export default apiTicket;
