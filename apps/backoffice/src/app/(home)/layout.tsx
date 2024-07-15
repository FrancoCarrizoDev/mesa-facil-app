import PrivateNavbar from "@/components/Navbar/private-navbar";
import HeaderContainer from "@/components/Header/header-container";
import { BrandTitle } from "@repo/ui/brand-title";
import { Suspense, type ReactNode } from "react";
import ToastifyProvider from "@/providers/toastify-provider";
import "react-tooltip/dist/react-tooltip.css";
import Breadcrums from "@/components/Breadcrums/breadcrums";
import { DialogProvider } from "src/context/dialog/dialog.provider";
import DialogProviderComponent from "@/providers/dialog-provider";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div>
      <DialogProvider>
        <DialogProviderComponent>
          <ToastifyProvider>
            <HeaderContainer>
              <BrandTitle />
              <Suspense fallback={<div>Cargando...</div>}>
                <PrivateNavbar />
              </Suspense>
            </HeaderContainer>
            <div className="px-5 py-3">
              <Breadcrums />
              {children}
            </div>
          </ToastifyProvider>
        </DialogProviderComponent>
      </DialogProvider>
    </div>
  );
}
