import { useParams } from "react-router-dom";

export default function ProviderPage() {
  const { id } = useParams();
  return <div>{id}</div>;
}
