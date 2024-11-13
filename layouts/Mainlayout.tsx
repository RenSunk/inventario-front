import { FC } from "react";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Navbar } from "./navbar";

interface MainlayoutProps {
  children: React.ReactNode;
}

export const Mainlayout: FC<MainlayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 66px)",
        }}
      >
        <div className="flex h-full w-full ">
          <Menu />
          <main className="bg-gray-100 h-full w-full">{children}</main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
