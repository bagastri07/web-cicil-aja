import fetcher from "./fetcher";

const apiAdmin = {
  postAdminLogin: (data) =>
    fetcher
      .post("/_admin/auth/login", data)
      .then((resp) => resp.data)
      .catch((err) => err),

  getAdminBorrower: (token) =>
    fetcher
      .get("/_admin/borrowers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminBorrowerId: (id, token) =>
    fetcher
      .get(`/_admin/borrowers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data)
      .catch((err) => err),

  getAdminLoanTicket: (token) =>
    fetcher
      .get("/_admin/loan-tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminLoanTicketPending: (token) =>
    fetcher
      .get("/_admin/loan-tickets?status=pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminLoanTicketAccepted: (token) =>
    fetcher
      .get("/_admin/loan-tickets?status=accepted", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminLoanId: (id, token) =>
    fetcher
      .get(`_admin/loan-tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  patchAdminLoan: (id, token) =>
    fetcher
      .patch(
        `/_admin/loan-tickets/${id}/update-status`,
        {
          status: "accepted",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminAmbassadorPending: (token) =>
    fetcher
      .get("/_admin/ambassadors/registrations?status=pending", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  getAdminAmbassadorAccepted: (token) =>
    fetcher
      .get("/_admin/ambassadors/registrations?status=accepted", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => resp.data.data)
      .catch((err) => err),

  patchAdminAmbassador: (id, token) =>
    fetcher
      .patch(
        `/_admin/ambassadors/${id}/update-status`,
        {
          status: "accepted",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => resp.data.data)
      .catch((err) => err),
};

export default apiAdmin;
