import { FC } from "react";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Navbar } from "./navbar";
import { useAuth } from "../context/AuthContext";
import { SessionExpiredModal } from "../components/LoginModal/SessionExpiredModal";

interface MainlayoutProps {
  children: React.ReactNode;
}

export const Mainlayout: FC<MainlayoutProps> = ({ children }) => {
  const { sessionExpired } = useAuth(); // 👈 Traemos el estado del AuthContext

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Menu />
        <main className="bg-background flex-1 overflow-y-auto">{children}</main>
      </div>

      <Footer />

      {sessionExpired && <SessionExpiredModal />}
    </div>
  );
};