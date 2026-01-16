import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Mainlayout } from "../layouts/Mainlayout";
import { useAuth } from "../context/AuthContext";
import { constants } from "buffer";

interface Perfil {
    username: number;
    email: string;
    first_name: string;
    last_name: string;
    picture: string;
    customer: string;
}

const BACKEND_BASE_URL = "https://api.inventario.tecno-service-soft.com";

export default function PerfilUsuario() {
    const { token, setSessionExpired } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [perfil, setPerfil] = useState<Perfil | null>(null);

    const fileRef = useRef<HTMLInputElement | null>(null);
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [usernameText, setUsernameText] = useState("");

    useEffect(() => {
        if (!token) return;

        setLoading(true);

        fetch(`${BACKEND_BASE_URL}/cuenta/perfil/`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                if (response.status === 401) {
                    setSessionExpired(true);
                    throw new Error("Token expirado");
                }
                if (!response.ok) throw new Error("Error HTTP");
                return response.json();
            })
            .then((data) => {
                const perfilData: Perfil | null = Array.isArray(data?.results)
                    ? data.results[0] ?? null
                    : data ?? null;

                setPerfil(perfilData);

                if (perfilData) {
                    setFirstName(perfilData.first_name ?? "");
                    setLastName(perfilData.last_name ?? "");
                    setEmail(perfilData.email ?? "");
                    setUsernameText(String(perfilData.username ?? ""));
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [token, setSessionExpired]);

    const imagenUrl = useMemo(() => {
        const fallback = "/avatar-demo.jpg";

        if (imagenPreview) return imagenPreview;
        if (!perfil?.picture) return fallback;

        const pic = perfil.picture.trim();
        if (!pic) return fallback;

        if (pic.startsWith("http://") || pic.startsWith("https://")) {
            return pic;
        }

        return `${BACKEND_BASE_URL}${pic.startsWith("/") ? "" : "/"}${pic}`;
    }, [perfil?.picture, imagenPreview]);

    return (
        <div className="min-h-screen bg-background from-slate-950 to-slate-900 px-4 py-10 text-slate-100">
            <div className="mx-auto max-w-5xl">
                <div className="rounded-3xl border border-black/30 bg-background/5 p-6 backdrop-blur shadow-md">
                    <h1 className="text-lg font-semibold text-text">Perfil de usuario</h1>

                    {loading ? (
                        <p className="mt-6 text-slate-400 text-text">Cargando...</p>
                    ) : (
                        <>
                            <div className="mt-6 flex items-center gap-6">
                                <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-black/30">
                                    <Image
                                        src={imagenUrl}
                                        alt="Imagen"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/gif"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            setImagenPreview(URL.createObjectURL(file));
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => fileRef.current?.click()}
                                        className="rounded-lg border border-buttonTheme bg-white/10 px-4 py-2 text-sm hover:bg-buttonHoverTheme/30 text-text"
                                    >
                                        Cambiar Imagen
                                    </button>

                                    <p className="mt-1 text-xs text-slate-400">
                                        JPG, GIF o PNG. 1MB max.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-text">
                                            Nombre
                                        </label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="h-11 w-full rounded-lg border border-focusLabelText text-text bg-white/5 px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-text">
                                            Apellido
                                        </label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="h-11 w-full rounded-lg border border-focusLabelText text-text bg-white/5 px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-text">
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-11 w-full rounded-lg border border-focusLabelText text-text bg-white/5 px-3 outline-none focus:ring-2 focus:ring-indigo-500/30"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-text">
                                        Nombre de Usuario
                                    </label>
                                    <input
                                        value={usernameText}
                                        onChange={(e) => setUsernameText(e.target.value)}
                                        className="h-11 w-full rounded-lg border border-focusLabelText bg-white/5 px-3 outline-none focus:ring-2 focus:ring-indigo-500/30 text-text"
                                        placeholder="example.com/janesmith"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-text">
                                        Cliente
                                    </label>
                                    <input
                                        value={perfil?.customer}
                                        className="h-11 w-full rounded-lg border border-focusLabelText bg-white/5 px-3 outline-none focus:ring-2 focus:ring-indigo-500/30 text-text"
                                    >
                                    </input>
                                </div>

                                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold hover:bg-confirmHover">
                                    Guardar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

PerfilUsuario.getLayout = function getLayout(page: React.ReactNode) {
    return <Mainlayout>{page}</Mainlayout>;
};