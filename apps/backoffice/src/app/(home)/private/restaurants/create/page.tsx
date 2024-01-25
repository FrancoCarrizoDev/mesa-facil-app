import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import RestaurantForm from "../components/restaurant-form";

export default function CreateRestaurantPage(): JSX.Element {
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
