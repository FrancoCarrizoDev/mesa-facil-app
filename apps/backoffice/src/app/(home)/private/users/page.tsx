import { getUserList } from "@/actions/user.actions";
import Link from "@/components/Link/link";
import { ROLES } from "@/constants/roles";
import getSession from "@/utils/get-session";
import { hasManageUsersPermission } from "@/utils/permissions";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";

export default async function UsersPage() {
  const session = await getSession();

  const hasPermission = hasManageUsersPermission(session?.user?.role || "USER");
  if (!hasPermission) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  const userList = await getUserList();

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
        <pre>
          <code>{JSON.stringify(userList, null, 2)}</code>
        </pre>
      </SectionBody>
    </Section>
  );
}
