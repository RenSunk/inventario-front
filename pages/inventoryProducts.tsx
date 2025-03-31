import React, { useEffect, useState } from "react";
import { Mainlayout } from "../layouts/Mainlayout";

export default function InventoryProducts() {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://api.inventario.tecno-service-soft.com/inventario/ListarProductos/", {
            method: "GET",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzMzkyNjM5LCJpYXQiOjE3NDMzOTIzMzksImp0aSI6IjFhYmY1MzUyNjVhYzQyOTdiMDgxYjM0MzI0MWJlNTEyIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiJ9.Pusv6qUNbukR3XnFGXpHaov-2lV84BliYqgwBOQOB6g",
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
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error al obtener los productos:", error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-red-500 text-xl font-bold">¡Inventario de Productos!</h1>
            {loading && <p className="text-white">Cargando productos...</p>}
        </div>
    );
}

InventoryProducts.getLayout = function getLayout(page: React.ReactNode) {
    return <Mainlayout>{page}</Mainlayout>;
};