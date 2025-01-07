import Image from "next/image";
import InventoryLoggin from "../images/InventoryLoggin.png";

export default function Prueba() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background w-full ">
      <div className="bg-primary rounded-lg shadow-extra-intense p-6 flex flex-col items-center justify-center w-[30%] h-[60vh]">
        <form
          className="rounded-lg p-6 w-full h-full flex flex-col items-center justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Formulario enviado");
          }}
        >
          <h1 className="text-xl xl:text-4xl font-semibold">
            Registro de Usuario
          </h1>
          <div className="text-center">
            <div className="text-sm text-gray-600 font-medium">
              - Completa el formulario para tu registro -
            </div>
          </div>

          <input
            type="email"
            name="Name"
            placeholder="Nombre Completo"
            required
            className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="nombre@correo.com"
            required
            className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Confirmar contraseña"
            required
            className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
          />
          <button
            type="submit"
            className="bg-buttontheme text-white rounded-md px-[4%] py-[2%] w-full hover:bg-hovertheme focus:outline-none focus:ring-2 focus:bg-focustheme"
          >
            Registrate
          </button>
          <p className="text-sm font-light text-gray-600 dark:text-gray-600">
            ¿Ya tienes una cuenta? <a href="/login" className="font-medium text-urlText hover:underline">¡Inicia Sesion!</a>
          </p>
        </form>
      </div>
      <div className="bg-slate-600 shadow-extra-intense w-[30%] h-[60vh] rounded-lg relative">
        <Image
          src={InventoryLoggin}
          alt="Inventario"
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    </div>
  );
}