// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import NavbarCard from "./components/NavbarCard";
import LocationCard from "./components/LocationCard";

export default function App() {
  const [appUser, setAppUser] = useState(
    JSON.parse(localStorage.getItem("appUser"))
  );

  return (
    <div className="container-fluid bg-secondary justify-content-center">
      <header>
        <NavbarCard appUser={appUser} setAppUser={setAppUser} />
      </header>
      <main>
        <LocationCard appUser={appUser} setAppUser={setAppUser} />
      </main>
      {/* <footer>
        <br></br>
        <h1 className="text-center">All rights</h1>
      </footer> */}
      <footer className="text-center">
        <h3>
          &copy; Copyright 2023. MIB DESIGN. All rights reserved. Powered by
          DJANGO-POSTGRES-REACT-BOOTSTRAP{" "}
        </h3>
      </footer>
    </div>
  );
}
