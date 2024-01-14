import { BrandTitle } from "@repo/ui/brand-title";
import { Suspense } from "react";
import Navbar from "src/components/shared/Navbar/navbar";
import { HeaderContainer } from "./components";

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen">
      <HeaderContainer>
        <BrandTitle />
        <Suspense fallback={<div>Cargando...</div>}>
          <Navbar />
        </Suspense>
      </HeaderContainer>
    </main>
  );
}
