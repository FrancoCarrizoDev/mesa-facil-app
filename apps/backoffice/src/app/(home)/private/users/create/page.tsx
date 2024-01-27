import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import React from "react";
import UserForm from "./components/user-form";

export default function Create() {
  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Crear Usuario</SectionTitle>
      </div>
      <SectionBody>
        <UserForm />
      </SectionBody>
    </Section>
  );
}
