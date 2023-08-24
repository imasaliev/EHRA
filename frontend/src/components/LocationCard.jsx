import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import logo from "../img/logo.svg";
import LocationChange from "../modals/LocationChange";
import EquipmentAdd from "../modals/EquipmentAdd";
import LocationAdd from "../modals/LocationAdd";
import ChartCard from "../components/ChartCard";

export default function LocationCard({ appUser, setAppUser }) {
  const [currentPrice, setCurrentPrice] = useState(null);
  return appUser ? (
    <>
      {appUser.locations.length ? null : (
        <LocationAdd appUser={appUser} setAppUser={setAppUser} />
      )}
      <Tabs
        id="fill-tab-example"
        className="mb-3 d-flex justify-content-center"
        fill
      >
        {appUser.locations.length
          ? appUser.locations.map((location, indexL) => (
              <Tab
                key={location.id}
                eventKey={location.name}
                title={location.name.toUpperCase()}
              >
                <Row className="mb-3 d-flex justify-content-center">
                  <LocationChange
                    location={location}
                    appUser={appUser}
                    setAppUser={setAppUser}
                  />
                </Row>

                <Row className="mb-3 d-flex justify-content-center">
                  {location.equipments.length
                    ? location.equipments.map((equipment) => (
                        <EquipmentCard
                          key={equipment.id}
                          appUser={appUser}
                          setAppUser={setAppUser}
                          equipment={equipment}
                          currentPrice={currentPrice}
                        />
                      ))
                    : null}
                </Row>
                <Row className="mb-3 d-flex justify-content-center">
                  <LocationAdd appUser={appUser} setAppUser={setAppUser} />
                  <EquipmentAdd
                    location={location}
                    appUser={appUser}
                    setAppUser={setAppUser}
                  />
                </Row>
                <Row>
                  <ChartCard
                    provider={location.provider_id}
                    currentPrice={currentPrice}
                    setCurrentPrice={setCurrentPrice}
                  />
                </Row>
              </Tab>
            ))
          : null}
      </Tabs>
    </>
  ) : (
    <img src={logo} />
  );
}
