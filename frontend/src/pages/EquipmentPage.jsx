import { useParams } from "react-router-dom";

export default function EquipmentPage() {
  const { loc_id, eq_id } = useParams();
  return <div>{loc_id + eq_id}</div>;
}
