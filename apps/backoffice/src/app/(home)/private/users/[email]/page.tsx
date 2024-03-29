import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import UserForm from "../components/user-form";
import { hasEditUserPermission } from "@/utils/permissions";
import { getRestaurantListToUserAssing } from "@/actions/restaurant.actions";
import { getUserByEmail } from "@/actions/user.actions";
import { notFound } from "next/navigation";
import getSession from "@/utils/get-session";

export default async function UserPage({
  params,
}: {
  params: { email: string };
}) {
  const session = await getSession();

  if (!session) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  console.log({ params });

  const userToEdit = await getUserByEmail(decodeURIComponent(params.email));

  if (!userToEdit) {
    return notFound();
  }

  const hasPermissionInPage = hasEditUserPermission(
    session?.user.role || "USER",
    userToEdit.userRole
  );

  if (!hasPermissionInPage) {
    return <h1>Acceso denegado - No tienes permisos</h1>;
  }

  const restaurantList = await getRestaurantListToUserAssing();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Editar Usuario</SectionTitle>
      </div>
      <SectionBody>
        <UserForm restaurantList={restaurantList} user={userToEdit} />
      </SectionBody>
    </Section>
  );
}
