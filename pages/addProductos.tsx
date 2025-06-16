import { Mainlayout } from "../layouts/Mainlayout";
import React from "react";

export default function AgregarProductos() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Agregar Producto</h1>
          <h3 className="text-lg text-gray-600 mt-2">Información General</h3>
        </div>

        <form>
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto
            </label>
            <input
              id="productName"
              type="text"
              placeholder="Nombre del Producto"
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Descripción del producto"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cuenta */}
          <div className="mb-4">
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
              Cuenta
            </label>
            <select
              id="account"
              className="border border-gray-300 rounded-md px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una cuenta</option>
              {/* Aquí deberías cargar opciones dinámicamente si lo necesitas */}
              <option value="1">Cuenta 1</option>
              <option value="2">Cuenta 2</option>
            </select>
          </div>

          {/* Marca */}
          <div className="mb-6">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Marca
            </label>
            <input
              id="brand"
              type="text"
              placeholder="Marca del producto"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              GUARDAR
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar y agregar otro
            </button>
            <button
              type="button"
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar y continuar editando
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