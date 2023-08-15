import { useParams } from "react-router-dom";

export default function LocationPage() {
  const { loc_id } = useParams();
  return <div>{loc_id}</div>;
}
