import { getUserList } from "@/actions/user.actions";
import { hasManageUsersPermission } from "@/utils/permissions";
import getSession from "@/utils/get-session";
import Link from "@/components/Link/link";
import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import UsersClientPage from "./page.client";

export default async function UsersPage() {
  const session = await getSession();

  if (!session) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  const hasPermission = hasManageUsersPermission(session?.user?.role || "USER");
  if (!hasPermission) {
    return <div>Ups, no tienes permisos para ver esta página...</div>;
  }

  const userList = await getUserList();

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Mis Usuarios</SectionTitle>
        <Link underline="hover" href="/private/users/create">
          Nuevo Usuario
        </Link>
      </div>
      <SectionBody>
        <UsersClientPage
          userList={userList}
          userLoggedRole={session?.user.role}
        />
      </SectionBody>
    </Section>
  );
}
