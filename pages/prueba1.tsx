import { Mainlayout } from "../layouts/Mainlayout";
import Combobox from "../components/commons/Combobox";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LoadingComponent from "../components/Loading/loading";
import { GET_unidades } from "../services/cantidades";

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

export default function Prueba() {

  const { token, setSessionExpired } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [listCantidades, setListCantidades] = useState<Array<{}>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [unitOptions, setUnitOptions] = useState<any[]>([]);

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

  useEffect(() => {

    console.log("Se ingresa al useEffect de la clase addCantidades");
    console.log("Token:", token);

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
        console.log("Respuesta de la API:", data);

        if (Array.isArray(data.results)) {
          setProducts(data.results);
        } else {
          setProducts([]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (!token) return;

    GET_unidades(token).then((response) => {
      setListCantidades(response);
    }).catch((error) => {
      console.error("Error al obtener unidades:", error);
    });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedProduct = products.find(
      (p) => p.id === parseInt(selectedProductId)
    );

    if (!selectedProduct) {
      alert("Debes seleccionar un producto válido.");
      return;
    }

    const payload = {
      name: selectedProduct.name,
      description: selectedProduct.description,
      brand: selectedProduct.brand || "",
      product_unit: selectedProduct.units.map((unitObj) => ({
        unit: unitObj.unit.id,
        quantity: unitObj.quantity,
        public_price: unitObj.public_price,
        supplier_price: unitObj.supplier_price,
        is_main: unitObj.is_main,
      })),
      stock_unit: selectedProduct.stock_units.map((stock) => ({
        original_quantity: stock.original_quantity,
        remaining_quantity: stock.remaining_quantity,
        is_cut: stock.is_cut,
      })),
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
      alert("Producto guardado correctamente.");

      //Limpiar campos.
      setSelectedProductId("");

    } catch (error) {
      console.error(error);
      alert("Error al guardar el producto.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full h-full shadow-[0_0_25px_rgba(0,0,0,0.1)] min-h-[calc(70vh-64px)] overflow-y-auto">
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full max-w-6xl mx-auto bg-Targets p-4 sm:p-6 md:p-8 rounded min-h-[calc(70vh-64px)] overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-text">Agregar Unidad de Producto</h1>
            <h3 className="text-base sm:text-lg text-text mt-2">Información de la Unidad</h3>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-colorLabelText">
                Producto
              </label>
              <select
                id="product"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
              >
                <option value="">Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-colorLabelText">
                Unidad
              </label>
              <select
                id="unit"
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
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
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="isMain"
                type="checkbox"
                className="h-4 w-4 text-confirm focus:ring-focusLabelText border-gray-300 rounded"
              />
              <label htmlFor="isMain" className="ml-2 block text-sm text-colorLabelText">
                Es principal
              </label>
            </div>

            <div>
              <label htmlFor="details" className="block text-sm font-medium text-colorLabelText">
                Más detalles
              </label>
              <textarea
                id="details"
                rows={4}
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-bgText text-text focus:outline-none focus:ring-2 focus:ring-focusLabelText"
              />
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

Prueba.getLayout = function getLayout(page: React.ReactNode) {
  return <Mainlayout>{page}</Mainlayout>;
};
