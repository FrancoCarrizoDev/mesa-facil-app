import { ROLES } from "@repo/common/constants";
import React from "react";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import getSession from "@/utils/get-session";
import RestaurantForm from "../components/restaurant-form";

export default async function CreateRestaurantPage(): Promise<JSX.Element> {
  const session = await getSession();

  const hasCreateRestaurantPermission = session.user.roleId === ROLES.ADMIN.ID;

  if (!hasCreateRestaurantPermission) {
    return <div>No tienes permisos para acceder a esta sección</div>;
  }

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Crear restaurante</SectionTitle>
      </div>
      <SectionBody>
        <RestaurantForm />
      </SectionBody>
    </Section>
  );
}
