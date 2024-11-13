import Link from "next/link";

export const Menu = () => {
  const menuItems = [
    {
      name: "Dashboard",
      link: "/Dashboard",
    },
    {
      name: "Inicio",
      link: "/Inicio",
    },
  ];

  return (
    <div className="bg-gray-900 text-white h-full">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="hover:bg-gray-700 m-3  rounded-xl">
            <Link className="flex w-full h-full py-2 pl-5 pr-20 " href={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
