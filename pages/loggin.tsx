import { Mainlayout } from "../layouts/Mainlayout";
import Image from "next/image";
import InventoryLoggin from "../images/InventoryLoggin.png"

export default function prueba() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="bg-primary rounded-lg shadow-extra-intense p-6 flex flex-col items-center justify-center w-[30%] h-[30%] gap-6">
            <form 
                className="rounded-lg p-6 w-full h-full flex flex-col items-center justify-center gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Formulario enviado");
                }}
                >
                <h1 className="text-xl xl:text-2xl font-extrabold">
                    Inicio de Sesion
                </h1>
                <button
                    type="button" 
                    className="flex items-center bg-white border border-gray-300 rounded-lg p-2 w-full shadow-slate-800 hover:bg-hovertheme"
                >
                    <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                    />
                    <span className="text-text px-3">Inicia Sesión con Google</span>
                </button>
                <div className="text-center">
                        <div
                            className=" text-sm text-gray-600 font-medium">
                            - Inicia sesion con una cuenta -
                        </div>
                </div>
                <input
                    type="email"
                    name="email"
                    placeholder="📧 Ingrese el correo electrónico"
                    required
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-focus w-full"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="🔒 Ingrese la contraseña"
                    required
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-focus w-full"
                />
                <button
                    type="submit"
                    className="bg-buttontheme text-white rounded-md px-4 py-2 w-full hover:bg-hovertheme focus:outline-none focus:ring-2 focus:bg-focustheme"
                >
                    Iniciar Sesión
                </button>
            </form>
            <div className="w-full">
                <button
                    type="submit"
                    className="bg-buttontheme text-white rounded-md px-4 py-2 w-full hover:bg-hovertheme focus:outline-none focus:ring-2 focus:bg-focustheme mb-8"
                >
                    Registrate Aquí 
                </button>
            </div>
        </div>
        <div className="bg-slate-600 shadow-extra-intense w-[28.8%] rounded-lg">
            <Image src={InventoryLoggin} alt="Inventario" className="h-full rounded-lg object-cover"/>
        </div>
    </div>
  );
}