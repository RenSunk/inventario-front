import { Mainlayout } from "../layouts/Mainlayout";
import React from "react";


export default function AgregarProductos() {
    return (
        <div>
            <div>
                <div>
                    <h1>Agregar Producto</h1>
                    <h3>Información General</h3>
                </div>
                <form>
                    <div className="mb-4">
                        <div className="mb-4">
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Producto
                            </label>
                            <input
                                id="productName"
                                type="text"
                                placeholder="Nombre del Producto"
                                required
                                className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

AgregarProductos.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};
