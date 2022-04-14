import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Redirect from "../../auth/redirect";
import DashboardLayout from "../../components/dashboardLayout";

function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getUser(token).then((resp) => setName(resp.name));
  }, []);

  return (
    <Redirect>
      <DashboardLayout page="menu">
        <h1 className="mb-[1000px]">Hi, {name?.split(" ").slice(0, 1)}!</h1>
        <h1 className="">Selamat Kamu Telah Login</h1>
      </DashboardLayout>
    </Redirect>
  );
}

export default Dashboard;
