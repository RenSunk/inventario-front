import { Mainlayout } from "../layouts/Mainlayout";
import Combobox from "../components/commons/Combobox";
import { useEffect, useState } from "react";

import { GET_cantidades } from "../services/cantidades";
import { TextField } from "@mui/material";

export default function Prueba() {
  const [listCantidades, setListCantidades] = useState<Array<{}>>([]);

  useEffect(() => {
    GET_cantidades().then((response) => {
      setListCantidades(response.data);
    });
  }, []);

  return (
    <div>
      <h1>prueba</h1>

      <div>
        <TextField
          className="mr-2"
          id="standard-basic"
          label="Nombre Producto"
          variant="standard"
        />
        <div>
          <p>Cantidad Principal</p>
          <div
            style={{
              border: "1px solid black",
            }}
            className="flex p-5 m-5 rounded-md"
          >
            <TextField
              className="mr-2"
              id="standard-basic"
              label="Cantida(num)"
              variant="standard"
              type="number"
            />
            <Combobox
              className="mr-2"
              options={listCantidades}
              nameKey="complete_name"
              valueKey="id"
              label="Tipo de cantidad"
              onChange={(event, value) => {
                console.log(value);
              }}
            />
            <TextField
              className="mr-2"
              id="standard-basic"
              label="Precio"
              variant="standard"
              type="number"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Prueba.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};
