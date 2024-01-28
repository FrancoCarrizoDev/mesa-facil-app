import Navbar from "@/components/Navbar/navbar";
import HeaderContainer from "@/components/Header/header-container";
import { BrandTitle } from "@repo/ui/brand-title";
import { Suspense, type ReactNode } from "react";
import ToastifyProvider from "@/providers/toastify-provider";
import "react-tooltip/dist/react-tooltip.css";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  return (
    <div>
      <ToastifyProvider>
        <HeaderContainer>
          <BrandTitle />
          <Suspense fallback={<div>Cargando...</div>}>
            <Navbar />
          </Suspense>
        </HeaderContainer>
        <div className="p-5">{children}</div>
      </ToastifyProvider>
    </div>
  );
}
