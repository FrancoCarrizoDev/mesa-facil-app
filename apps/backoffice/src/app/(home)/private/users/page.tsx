import Link from "@/components/Link/link";
import { ROLES } from "@/constants/roles";
import getSession from "@/utils/get-session";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";

export default async function UsersPage() {
  const session = await getSession();

  if (session?.user?.role !== ROLES.ADMIN.ID) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Usuarios</SectionTitle>
        <Link underline="hover" href="/private/users/create">
          Nuevo Usuario
        </Link>
      </div>
      <SectionBody>
        <div>usuarios</div>
      </SectionBody>
    </Section>
  );
}
