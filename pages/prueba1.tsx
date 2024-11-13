import { Mainlayout } from "../layouts/Mainlayout";

export default function prueba() {
  return (
    <div>
      <h1>prueba</h1>
    </div>
  );
}

prueba.getLayout = function getLayout(page: React.ReactNode) {
    return <Mainlayout>{page}</Mainlayout>;
}