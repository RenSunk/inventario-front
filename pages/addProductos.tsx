import { useAuth } from "../context/AuthContext";
import { Mainlayout } from "../layouts/Mainlayout";
import React, { useEffect, useState } from "react";
import { GET_unidades } from "../services/cantidades";

export default function AgregarProductos() {

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [productUnit, setProductUnit] = useState("")
  const [productQuantity, setProductQuantity] = useState("")
  const [productPublicPrice, setProductPublicPrice] = useState("")
  const [productSupplierPrice, setProductSupplierPrice] = useState("")
  const [productOriginalQuantity, setProductOriginalQuantity] = useState("")
  const [productRemainingQuantity, setProductRemainingQuantity] = useState("")
  const [unitOptions, setUnitOptions] = useState<any[]>([]);
  const [pasoForm, setPasoForm] = useState(1);
  const [productIsMain, setProductIsMain] = useState(false);
  const [productIsCut, setProductIsCut] = useState(false);
  const { token, setSessionExpired } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchUnits = async () => {
      try {
        const unidades = await GET_unidades(token);
        setUnitOptions(unidades);
      } catch (error) {
        console.error("Error al cargar unidades:", error);
      }
    };

    fetchUnits();
  }, [token]);

  const handleNextFormPaso = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasoForm(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: productName,
      description: description,
      brand: brand,
      product_unit: [{
        unit: productUnit,
        quantity: productQuantity,
        public_price: productPublicPrice,
        supplier_price: productSupplierPrice,
        is_main: productIsMain,
      }],
      stock_unit: [{
        original_quantity: productOriginalQuantity,
        remaining_quantity: productRemainingQuantity,
        is_cut: productIsCut,
      }],
    };

    try {
      const response = await fetch(
        "https://api.inventario.tecno-service-soft.com/inventario/AgregarProducto/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 401) {
        setSessionExpired(true);
        throw new Error("Token expirado o inválido");
      }

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
    setProductUnit("");
    setProductQuantity("");
    setProductPublicPrice("");
    setProductSupplierPrice("");
    setProductOriginalQuantity("");
    setProductRemainingQuantity("");
    setProductIsMain(false);
    setProductIsCut(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full h-full shadow-[0_0_25px_rgba(0,0,0,0.1)] min-h-[calc(70vh-64px)] overflow-y-auto">
      {pasoForm === 1 && (
        <div className="w-full max-w-6xl mx-auto bg-Targets p-4 sm:p-6 md:p-8 rounded min-h-[calc(70vh-64px)] overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-text">
              Agregar Producto
            </h1>
            <h3 className="text-base sm:text-lg text-text mt-2">
              Información General
            </h3>
          </div>

          <form onSubmit={handleNextFormPaso}>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-colorLabelText"
              >
                Nombre del Producto
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Nombre del Producto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-focusLabelText bg-bgText placeholder-colorPlaceHolderText"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-colorLabelText mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Descripción del producto"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-focusLabelText bg-bgText placeholder-colorPlaceHolderText"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-colorLabelText mb-1"
              >
                Marca
              </label>
              <input
                id="brand"
                type="text"
                placeholder="Marca del producto"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 sm:py-2 w-full focus:outline-none focus:ring-2 focus:ring-focusLabelText bg-bgText placeholder-colorPlaceHolderText"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="bg-confirm hover:bg-confirmHover text-white px-4 py-2 rounded w-full sm:w-auto"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
      {pasoForm === 2 && (
        <div className="w-full max-w-6xl mx-auto bg-Targets p-4 sm:p-6 md:p-8 rounded min-h-[calc(70vh-64px)] overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-text">Agregar Unidad del Producto</h1>
            <h3 className="text-base sm:text-lg text-text mt-2">Información de la Unidad</h3>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-colorLabelText">
                Unidad
              </label>
              <select
                id="unit"
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                value={productUnit}
                onChange={(e) => setProductUnit(e.target.value)}
              >
                <option value="">Seleccione una unidad</option>
                {unitOptions.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.complete_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-colorLabelText">
                Cantidad
              </label>
              <input
                id="quantity"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="publicPrice" className="block text-sm font-medium text-colorLabelText">
                  Precio Público
                </label>
                <input
                  id="publicPrice"
                  type="number"
                  step="0.01"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                  onChange={(e) => setProductPublicPrice(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="supplierPrice" className="block text-sm font-medium text-colorLabelText">
                  Precio Proveedor
                </label>
                <input
                  id="supplierPrice"
                  type="number"
                  step="0.01"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                  onChange={(e) => setProductSupplierPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="isMain"
                type="checkbox"
                className="h-4 w-4 text-confirm focus:ring-focusLabelText border-gray-300 rounded"
                checked={productIsMain}
                onChange={(e) => setProductIsMain(e.target.checked)}
              />
              <label htmlFor="isMain" className="ml-2 block text-sm text-colorLabelText">
                Es principal
              </label>
            </div>

            <div>
              <label htmlFor="originalQuantity" className="block text-sm font-medium text-colorLabelText">
                Cantidad Original
              </label>
              <input
                id="originalQuantity"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                value={productOriginalQuantity}
                onChange={(e) => setProductOriginalQuantity(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="remainingQuantity" className="block text-sm font-medium text-colorLabelText">
                Cantidad Restante
              </label>
              <input
                id="remainingQuantity"
                type="number"
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
                value={productRemainingQuantity}
                onChange={(e) => setProductRemainingQuantity(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input
                id="isCut"
                type="checkbox"
                className="h-4 w-4 text-confirm focus:ring-focusLabelText border-gray-300 rounded"
                checked={productIsCut}
                onChange={(e) => setProductIsCut(e.target.checked)}
              />
              <label htmlFor="isCut" className="ml-2 block text-sm text-colorLabelText">
                Es corte
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button type="submit" className="bg-confirm hover:bg-confirmHover text-white px-4 py-2 rounded w-full sm:w-auto">
                Guardar
              </button>
              <button type="button" className="bg-confirm hover:bg-confirmHover text-white px-4 py-2 rounded w-full sm:w-auto">
                Guardar y Agregar Otro
              </button>
              <button type="button" className="bg-confirm hover:bg-confirmHover text-white px-4 py-2 rounded w-full sm:w-auto">
                Guardar y Continuar Editando
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

AgregarProductos.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};