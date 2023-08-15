import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarCard from "./components/NavbarCard";

export default function App() {
  const [appUser, setAppUser] = useState("");
  return (
    <>
      <NavbarCard appUser={appUser} />
      <div className="main-page-contents">
        <Outlet context={{ appUser, setAppUser }} />
      </div>
    </>
  );
}
