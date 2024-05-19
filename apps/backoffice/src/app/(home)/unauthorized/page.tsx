import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";

export default function Page(): JSX.Element {
  return (
    <Section>
      <SectionTitle>No autorizado</SectionTitle>
      <SectionBody>
        <div>
          No tienes permisos para acceder a esta sección, hable con un
          administrador o encargado.
        </div>
      </SectionBody>
    </Section>
  );
}
