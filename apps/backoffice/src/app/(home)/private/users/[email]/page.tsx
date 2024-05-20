import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import { notFound, redirect } from "next/navigation";
import { canEditUser } from "@/utils/permissions";
import { getRestaurantListToUserAssing } from "@/actions/restaurant.actions";
import { getUserByEmail } from "@/actions/user.actions";
import getSession from "@/utils/get-session";
import UserForm from "../components/user-form";

interface UserPageProps {
  params: { email: string };
}

export default async function UserPage({
  params,
}: UserPageProps): Promise<JSX.Element> {
  const session = await getSession();

  const userToEdit = await getUserByEmail(decodeURIComponent(params.email));

  if (!userToEdit) {
    return notFound();
  }

  const hasPermissionInPage = canEditUser(
    session.user.roleId,
    userToEdit.userRoleId
  );

  if (!hasPermissionInPage) {
    return redirect("/unauthorized");
  }

  const restaurantList = await getRestaurantListToUserAssing(session.user.id);

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
