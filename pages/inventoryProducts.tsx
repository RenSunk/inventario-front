import React, { useEffect, useState } from "react";
import { Mainlayout } from "../layouts/Mainlayout";
import InventoryLoggin from "../images/InventoryLoggin.png";
import Image from "next/image";
import LoadingComponent from "../components/Loading/loading";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: number;
  name: string;
  description: string;
  brand?: string;
  units: {
    unit: {
      id: number;
      name: string;
      symbol: string;
      conversion_factor: number;
      category: {
        id: number;
        name: string;
        description: string;
      };
    };
    quantity: string | number;
    public_price: string;
    supplier_price: string;
    is_main: boolean;
  }[];
  stock_units: {
    original_quantity: string;
    remaining_quantity: string;
    is_cut: boolean;
  }[];
}

export default function Home() {
  
  console.log("Se ingresa a la funcion Home de la clase inventoryProducts");

  const { token, setSessionExpired  } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);
  const pageSize = 8;

  useEffect(() => {

    setLoading(true);

    console.log("Se ingresa al useEffect de la clase inventoryProducts");
    console.log("Token:", token);
    console.log("Valor Previous: ", previous);

    if (!token) {
      return;
    }

    fetch(`https://api.inventario.tecno-service-soft.com/inventario/ListarProductos/?page=${page}&page_size=${pageSize}`, {
      method: "GET",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          setSessionExpired(true);
          throw new Error("Token expirado o inválido");
        }
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de la API Paginada:", data);

        setProducts(data.results ?? []);
        setNext(data.next);
        console.log("previous data: ",data.previous);
        setPrevious(data.previous);
        setCount(data.count);
          
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, [token,page,pageSize]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-red-500 text-xl font-bold">¡Inventario de Productos!</h1>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full h-[calc(90vh-64px)] overflow-y-auto px-6">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-start justify-start m-4 rounded-lg bg-panelCard text-white shadow-lg hover:shadow-xl w-full max-w-sm p-4 space-y-4"
              >
                <div className="w-full flex justify-center">
                  <Image
                    src={InventoryLoggin}
                    alt="Inventario"
                    className="rounded-lg object-contain w-full max-w-[100px] h-auto"
                  />
                </div>

                <h2 className="text-xl font-bold text-center w-full">{product.name}</h2>

                <p className="text-sm text-center w-full text-gray-200 mb-2">
                  {product.description || "Sin descripción"}
                </p>

                {Array.isArray(product.units) &&
                  product.units.map((unit, idx) => (
                    <div
                      key={idx}
                      className={`border-l-4 pl-3 py-1 ${
                        unit.is_main ? "border-blue-400" : "border-orange-400"
                      }`}
                    >
                      <p className="font-semibold">
                        {unit.is_main ? "🔹 Unidad principal" : "🔸 Otra unidad"}:{" "}
                        {unit.unit?.name ?? "Sin nombre"}
                      </p>
                      <ul className="text-sm list-disc ml-4">
                        <li>Cantidad: {unit.quantity}</li>
                        <li>Precio público: ${unit.public_price}</li>
                        <li>Precio proveedor: ${unit.supplier_price}</li>
                      </ul>
                    </div>
                  ))}

                {Array.isArray(product.stock_units) && product.stock_units.length > 0 && (
                  <div className="mt-2 text-sm">
                    <p className="flex items-center">
                      <span className="mr-1">📦</span> Total en inventario:{" "}
                      <strong>{product.stock_units[0].remaining_quantity}</strong>
                    </p>
                    <p
                      className={`flex items-center mt-1 ${
                        product.stock_units[0].is_cut
                          ? "text-yellow-300"
                          : "text-green-400"
                      }`}
                    >
                      <span className="mr-1">
                        {product.stock_units[0].is_cut ? "⚠️" : "✅"}
                      </span>
                      {product.stock_units[0].is_cut ? "Con cortes" : "Sin cortes"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              ◀ Anterior
            </button>

            <span className="font-semibold text-white">
              Página {page} / {Math.ceil(count / pageSize)}
            </span>

            <button
              className="bg-blue-500 px-4 py-2 rounded disabled:bg-gray-500"
              disabled={page >= Math.ceil(count / pageSize)}
              onClick={() => setPage((p) => p + 1)}
            >
              Siguiente ▶
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};