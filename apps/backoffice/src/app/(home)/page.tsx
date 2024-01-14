import React from "react";
import { HeaderContainer } from "./components";
import { BrandTitle } from "@repo/ui/brand-title";

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen">
      <HeaderContainer>
        <BrandTitle />
      </HeaderContainer>
    </main>
  );
}
