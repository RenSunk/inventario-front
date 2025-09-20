import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";

export const SessionExpiredModal = () => {
  const { setToken, setSessionExpired } = useAuth();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://api.inventario.tecno-service-soft.com/cuenta/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          password: pass,
          client_id: 1,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en login");

      const encryptToken = btoa(data.access_token);
      const encryptUser = btoa(user);
      const encryptTokenName = btoa("token");
      const encryptuserName = btoa("username");

      Cookies.set(encryptTokenName, encryptToken, { expires: 1 });
      Cookies.set(encryptuserName, encryptUser, { expires: 1 });

      setToken(data.access_token);

      setSessionExpired(false);
    } catch (err) {
      alert("Error al iniciar sesión");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-beigePrimary p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-red-600">Sesión expirada</h2>
        <p className="mb-4">Tu sesión ha caducado. Vuelve a iniciar sesión:</p>
        <input
          type="text"
          placeholder="Usuario"
          className="border p-2 w-full mb-2 rounded"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 w-full mb-4 rounded"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primaryHover"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};