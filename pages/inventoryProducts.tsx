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

  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    if (!token) {
      return;
    }

    fetch("https://api.inventario.tecno-service-soft.com/inventario/ListarProductos/", {
      method: "GET",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de la API:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center h-16">
        <h1 className="text-red-500 text-xl font-bold">¡Inventario de Productos!</h1>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full grid gap-6 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start justify-start m-4 rounded-lg bg-Targets text-white shadow-lg hover:shadow-xl w-full max-w-sm p-4 space-y-4"
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

              {/* Unidades */}
              {Array.isArray(product.units) &&
                product.units.map((unit, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 pl-3 py-1 ${unit.is_main ? "border-blue-400" : "border-orange-400"
                      }`}
                  >
                    <p className="font-semibold">
                      {unit.is_main ? "🔹 Unidad principal" : "🔸 Otra unidad"}: {unit.unit?.name ?? "Sin nombre"}
                    </p>
                    <ul className="text-sm list-disc ml-4">
                      <li>Cantidad: {unit.quantity}</li>
                      <li>Precio público: ${unit.public_price}</li>
                      <li>Precio proveedor: ${unit.supplier_price}</li>
                    </ul>
                  </div>
                ))}

              {/* Inventario */}
              {Array.isArray(product.stock_units) && product.stock_units.length > 0 && (
                <div className="mt-2 text-sm">
                  <p className="flex items-center">
                    <span className="mr-1">📦</span> Total en inventario:{" "}
                    <strong>{product.stock_units[0].remaining_quantity}</strong>
                  </p>
                  <p
                    className={`flex items-center mt-1 ${product.stock_units[0].is_cut ? "text-yellow-300" : "text-green-400"
                      }`}
                  >
                    <span className="mr-1">{product.stock_units[0].is_cut ? "⚠️" : "✅"}</span>
                    {product.stock_units[0].is_cut ? "Con cortes" : "Sin cortes"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};