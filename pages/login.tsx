import Image from "next/image";
import InventoryLoggin from "../images/InventoryLoggin.png";
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useState } from "react";

export default function Login() {

    const router = useRouter();
    const[usuario, setUsuario] = useState('')
    const[contrasena, setContrasena] = useState('')
    const[id, setId] = useState('')
    const[traza, setTraza] = useState('')


    const envioDataLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await fetch('https://api.inventario.tecno-service-soft.com/cuenta/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usuario,
                    password: contrasena, 
                    client_id: 1
                })
            });
    
            const data = await response.json();
            console.log('Respuesta completa:', data);

            setTraza(data.message);
    
            if(response.ok){
                console.log('Token:', data.access_token)
                setTraza('Login exitoso');
                router.push('/');
            }

        } catch (error) {
            console.error('Error:', error);
            setTraza('Error de conexión con el servidor');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-background w-full ">
            <div className="bg-primary rounded-lg shadow-extra-intense p-6 flex flex-col items-center justify-center w-[30%] h-[60vh]">
                <form
                    className="rounded-lg p-6 w-full h-full flex flex-col items-center justify-center gap-3"
                    onSubmit={envioDataLogin}
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
                        placeholder= "usuario"
                        required
                        onChange={(e) => setUsuario(e.target.value)}
                        className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••••••••••"
                        required
                        onChange={(e) => setContrasena(e.target.value)}
                        className="border border-gray-300 rounded-md px-[4%] py-[2%] focus:outline-none focus:ring-2 focus:ring-focus w-full"
                    />
                    <button
                        type="submit"
                        className="bg-buttontheme text-white rounded-md px-[4%] py-[2%] w-full hover:bg-hovertheme focus:outline-none focus:ring-2 focus:bg-focustheme"
                    >
                        Iniciar Sesión
                    </button>
                    <p className="text-sm font-light text-gray-600 dark:text-gray-600">
                      ¿No tienes una cuenta aún? <Link href="/registerUser" className="font-medium text-urlText hover:underline">¡Registrate!</Link>
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