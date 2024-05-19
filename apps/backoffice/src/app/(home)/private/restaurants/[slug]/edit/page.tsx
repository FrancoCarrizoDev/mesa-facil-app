import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import { notFound } from "next/navigation";
import RestaurantForm from "../../components/restaurant-form";
import getSession from "@/utils/get-session";
import { ROLES } from "@repo/common/constants";

interface Props {
  readonly params: {
    slug: string;
  };
}

export default async function RestaurantPage({
  params,
}: Props): Promise<JSX.Element> {
  const session = await getSession();
  const hasCreateRestaurantPermission =
    session.user.roleId === ROLES.ADMIN.ID ||
    session.user.roleId === ROLES.MANAGER.ID;

  if (!hasCreateRestaurantPermission) {
    return <div>No tienes permisos para acceder a esta sección</div>;
  }

  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) return notFound();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Editar restaurante</SectionTitle>
      </div>
      <SectionBody>
        <RestaurantForm restaurant={restaurant} />
      </SectionBody>
    </Section>
  );
}
