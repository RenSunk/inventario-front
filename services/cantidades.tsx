export async function GET_unidades(token: string) {
  const response = await fetch("https://api.inventario.tecno-service-soft.com/inventario/Cantidades/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener unidades: ${response.status}`);
  }

  return await response.json(); // debe retornar el array de unidades
}