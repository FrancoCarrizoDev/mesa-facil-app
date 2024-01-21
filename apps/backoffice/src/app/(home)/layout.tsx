import { BrandTitle } from "@repo/ui/brand-title";
import { getServerSession } from "next-auth";
import { Suspense, type ReactNode } from "react";
import HeaderContainer from "src/components/shared/Header/header-container";
import Navbar from "src/components/shared/Navbar/navbar";
import { authOptions } from "src/utils/auth-options";

export default async function Layout({
  children,
}: {
  children: ReactNode;
}): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <div>
      <HeaderContainer>
        <BrandTitle />
        <Suspense fallback={<div>Cargando...</div>} key={session?.user?.name}>
          <Navbar />
        </Suspense>
      </HeaderContainer>
      {children}
    </div>
  );
}
