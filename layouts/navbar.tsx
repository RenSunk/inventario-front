import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Person, Settings, Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [show, setShow] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const { setToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove(btoa("token"));   
    setToken(null);                  
    router.push("/");           
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsRef]);

  return (
    <nav className="border-b-2 bg-beigePrimary w-full flex justify-between px-2">
      <div></div>
      <div ref={optionsRef} className="relative">
        <div
          className="flex items-center py-2 cursor-pointer hover:bg-buttontheme hover:text-textWhite hover:rounded-lg p-2"
          onClick={() => {
            setShow(!show);
          }}
        >
          <h4 className="font-semibold mx-2">Cuenta</h4>
          <div
            style={{
              height: "100%",
              width: "auto",
            }}
          >
            <Image
              className="rounded-full"
              alt="profile"
              src="/profile.png"
              width={25}
              height={25}
            />
          </div>
        </div>

        <div
          className={`bg-primary ${
            show ? "block" : "hidden"
          } absolute right-0 top-0 mt-12`}
          style={{
            borderWidth: "2px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          <button 
            className="flex items-center gap-2 hover:bg-hovertheme hover:text-white w-full px-5 my-2"
            onClick={() => router.push("/perfilUsuario")}
          >
            <Person />
            <h6>Actualizar</h6>
          </button>
          <button className="flex items-center gap-2 hover:bg-hovertheme hover:text-white w-full px-5 my-2">
            <Settings />
            <h6>Configuración</h6>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-hovertheme hover:text-white w-full px-5 my-2"
          >
            <Logout />
            <h6>Cerrar sesión</h6>
          </button>
        </div>
      </div>
    </nav>
  );
};