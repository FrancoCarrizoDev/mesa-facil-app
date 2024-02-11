import { getRestaurantBySlug } from "@/actions/restaurant.actions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import RestaurantForm from "../components/restaurant-form";
import { notFound } from "next/navigation";
import Link from "@/components/Link/link";

interface Props {
  readonly params: {
    slug: string;
  };
}

export default async function RestaurantPage({
  params,
}: Props): Promise<JSX.Element> {
  if (!params) return notFound();

  const restaurant = await getRestaurantBySlug(params.slug);

  if (!restaurant) return notFound();

  return (
    <Section>
      <div className="mb-6 flex justify-between">
        <SectionTitle>{restaurant.name}</SectionTitle>
        <div className="flex gap-3">
          <Link
            href={`/private/restaurants/${params.slug}/reservations/create`}
          >
            Crear reserva
          </Link>
          <Link href={`/private/restaurants/${params.slug}/reviews`}>
            Ver reseñas
          </Link>
        </div>
      </div>
      <SectionBody>Restaurant Section</SectionBody>
    </Section>
  );
}
