import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import getSession from "@/utils/get-session";
import { canManageUsers } from "@/utils/permissions";
import { getRestaurantListToUserAssing } from "@/actions/restaurant.actions";
import UserForm from "../components/user-form";

export default async function Create() {
  const session = await getSession();
  const hasPermissionInPage = canManageUsers(session?.user.role || "EMPLOYEE");

  if (!hasPermissionInPage) {
    return <h1>Acceso denegado - No tienes permisos</h1>;
  }

  const restaurantList = await getRestaurantListToUserAssing();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Crear Usuario</SectionTitle>
      </div>
      <SectionBody>
        <UserForm restaurantList={restaurantList} />
      </SectionBody>
    </Section>
  );
}
