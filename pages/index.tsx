import React, { useEffect, useState } from "react";
import { Mainlayout } from "../layouts/Mainlayout";

export default function Home() {
  const [data, setData] = useState<String>("hola mundo");
    
  return (
    <div>
      <h1 className="color-red-100">{data}</h1>
    </div>
  );
}



Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};
