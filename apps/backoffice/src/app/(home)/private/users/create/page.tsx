import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import { redirect } from "next/navigation";
import getSession from "@/utils/get-session";
import { canManageUsers } from "@/utils/permissions";
import { getRestaurantListToUserAssing } from "@/actions/restaurant.actions";
import UserForm from "../components/user-form";

export default async function Create(): Promise<JSX.Element> {
  const session = await getSession();
  const hasPermissionInPage = canManageUsers(session.user.roleId);

  if (!hasPermissionInPage) {
    return redirect("/unauthorized");
  }

  const restaurantList = await getRestaurantListToUserAssing(session.user.id);

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
