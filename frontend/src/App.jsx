import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarCard from "./components/NavbarCard";
import AppContext from "./contexts/AppContext";

export default function App() {
  const [appUser, setAppUser] = useState("");
  return (
    <AppContext.Provider
      value={{
        appUser,
        setAppUser,
      }}
    >
      <NavbarCard />
      <div className="main-page-contents">
        <Outlet context={{ appUser, setAppUser }} />
      </div>
    </AppContext.Provider>

    // <>
    //   <NavbarCard appUser={appUser} />
    //   <div className="main-page-contents">
    //     <Outlet context={{ appUser, setAppUser }} />
    //   </div>
    // </>
  );
}
