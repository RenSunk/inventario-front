import { useAuth } from "../context/AuthContext";
import { Mainlayout } from "../layouts/Mainlayout";
import React, { useState } from "react";

export default function AgregarProductos() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: productName,
      description: description,
      brand: brand,
      product_unit: [],
      stock_unit: [], 
    };

    try {
      const response = await fetch("https://api.inventario.tecno-service-soft.com/inventario/AgregarProducto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto");
      }

      const data = await response.json();
      console.log("Producto guardado:", data);
      resetForm();

    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setProductName("");
    setDescription("");
    setBrand("");
  };

  return (
    <div className="px-6 py-8">
      <div className="w-full max-w-6xl mx-auto bg-Targets p-4 sm:p-6 md:p-8 rounded shadow min-h-[calc(70vh-64px)] overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Agregar Producto</h1>
          <h3 className="text-lg text-white mt-2">Información General</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto
            </label>
            <input
              id="productName"
              type="text"
              placeholder="Nombre del Producto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Descripción del producto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Marca del producto"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-formButtonConfirmationTheme hover:bg-formButtonConfirmationHoverTheme text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
            <button type="button" className="bg-formButtonConfirmationTheme hover:bg-formButtonConfirmationHoverTheme text-white px-4 py-2 rounded">
              Guardar y Agregar Otro
            </button>
            <button type="button" className="bg-formButtonConfirmationTheme hover:bg-formButtonConfirmationHoverTheme text-white px-4 py-2 rounded">
              Guardar y Continuar Editando
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AgregarProductos.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};