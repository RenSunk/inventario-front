import React, { useEffect, useState } from "react";
import { Mainlayout } from "../layouts/Mainlayout";
import InventoryLoggin from "../images/InventoryLoggin.png";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState<String>("¡Bienvenido!");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center h-16">
        <h1 className="color-red-100">{data}</h1>
      </div>
      <div className="w-full items-center justify-center bg-primary grid grid-cols-4">
        <div className="flex flex-col items-center justify-center m-16 rounded-lg bg-Targets text-textWhite hover:shadow-2xl hover:text-textWhite shadow-extra-intense w-72 h-72 cursor-pointer">
          <h2 className="pb-5">Pintura</h2>
          <Image
            src={InventoryLoggin}
            alt="Inventario"
            className="rounded-lg object-cover w-60"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-16 rounded-lg bg-Targets text-textWhite hover:text-textWhite hover:shadow-2xl shadow-extra-intense w-72 h-72 cursor-pointer">
          <h2 className="pb-5 font-">Tornillos</h2>
          <Image
            src={InventoryLoggin}
            alt="Inventario"
            className="rounded-lg object-cover w-60"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-16 rounded-lg bg-Targets text-textWhite hover:shadow-2xl hover:text-textWhite shadow-extra-intense w-72 h-72 cursor-pointer">
          <h2 className="pb-5">Herramientas</h2>
          <Image
            src={InventoryLoggin}
            alt="Inventario"
            className="rounded-lg object-cover w-60"
          />
        </div>
        <div className="flex flex-col items-center justify-center m-16 rounded-lg bg-Targets text-textWhite hover:shadow-2xl hover:text-textWhite shadow-extra-intense w-72 h-72 cursor-pointer">
          <h2 className="pb-5">Otros</h2>
          <Image
            src={InventoryLoggin}
            alt="Inventario"
            className="rounded-lg object-cover w-60"
          />
        </div>
      </div>
    </div>
  );
}



Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};
