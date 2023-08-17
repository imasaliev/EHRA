import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarCard from "./components/NavbarCard";
import AppContext from "./contexts/AppContext";

export default function App() {
  const [appUser, setAppUser] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state flag

  return (
    <AppContext.Provider
      value={{
        appUser,
        setAppUser,
      }}
    >
      <NavbarCard />
      <div className="bg-secondary">
        <Outlet
          className="bg-secondary"
          context={{
            appUser,
            setAppUser,
            currentPrice,
            setCurrentPrice,
            loading,
            setLoading,
          }}
        />
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
