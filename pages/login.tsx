import Image from "next/image";
import InventoryLoggin from "../images/InventoryLoggin.png";

export default function Login() {
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
                        Inicio de Sesión
                    </h1>
                    <button
                        type="button"
                        className="flex justify-center items-center bg-white border border-gray-300 rounded-lg px-[4%] py-[2%] w-full shadow-slate-800 hover:bg-hovertheme"
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
                        <div className="text-sm text-gray-600 font-medium">
                            - Inicia sesión con una cuenta -
                        </div>
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder= "nombre@correo.com"
                        required
                        className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••••••••••"
                        required
                        className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
                    />
                    <button
                        type="submit"
                        className="bg-buttontheme text-white rounded-md px-[4%] py-[2%] w-full hover:bg-hovertheme focus:outline-none focus:ring-2 focus:bg-focustheme"
                    >
                        Iniciar Sesión
                    </button>
                    <p className="text-sm font-light text-gray-600 dark:text-gray-600">
                      ¿No tienes una cuenta aún? <a href="/registerUser" className="font-medium text-urlText hover:underline">¡Registrate!</a>
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