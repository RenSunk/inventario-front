import Link from "next/link";
import { useRouter } from "next/router"; // Importar el hook useRouter

export const Menu = () => {
  const router = useRouter(); // Obtener la ruta actual

  const menuItems = [
    {
      name: "Dashboard",
      link: "/Dashboard",
    },
    {
      name: "Inicio",
      link: "/",
    },
    {
      name: "Agregar Producto",
      link: "/AddProductos",
    },
    {
      name: "Inventario",
      link: "/Inventario",
    }
  ];

  return (
    <div className="bg-primary text-text h-full">
      <ul>
        {menuItems.map((item, index) => {
          const isActive = router.pathname === item.link;

          return (
            <li
              key={item.name}
              className={`m-3 rounded-xl ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
                }`}
            >
              <Link
                className="flex w-full h-full py-2 pl-5 pr-20"
                href={item.link}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};