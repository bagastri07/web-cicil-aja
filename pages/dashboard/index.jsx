import React from "react";
import Redirect from "../../auth/redirect";

function Dashboard() {
  return (
    <Redirect>
      <div>
        <h1>Selamat Kamu Telah Login</h1>
      </div>
    </Redirect>
  );
}

export default Dashboard;
