import { BrandTitle } from "@repo/ui/brand-title";
import { Suspense, type ReactNode } from "react";
import HeaderContainer from "src/components/shared/Header/header-container";
import Navbar from "src/components/shared/Navbar/navbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div>
      <HeaderContainer>
        <BrandTitle />
        <Suspense fallback={<div>Cargando...</div>}>
          <Navbar />
        </Suspense>
      </HeaderContainer>
      {children}
    </div>
  );
}
