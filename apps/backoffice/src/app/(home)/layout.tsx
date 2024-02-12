import PrivateNavbar from "@/components/Navbar/private-navbar";
import HeaderContainer from "@/components/Header/header-container";
import { BrandTitle } from "@repo/ui/brand-title";
import { Suspense, type ReactNode } from "react";
import ToastifyProvider from "@/providers/toastify-provider";
import "react-tooltip/dist/react-tooltip.css";
import Breadcrums from "@/components/Breadcrums/breadcrums";

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
            <PrivateNavbar />
          </Suspense>
        </HeaderContainer>
        <div className="p-5">
          <div className="mb-1">
            <Breadcrums />
          </div>
          {children}
        </div>
      </ToastifyProvider>
    </div>
  );
}
