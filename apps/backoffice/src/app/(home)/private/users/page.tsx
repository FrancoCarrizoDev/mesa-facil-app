import Section from "@repo/ui/section";
import SectionBody from "@repo/ui/section-body";
import SectionTitle from "@repo/ui/section-title";
import { redirect } from "next/navigation";
import type { UserDTO } from "@repo/common/models";
import { ROLES } from "@repo/common/constants";
import {
  getUserListByAdmin,
  getUserListByManager,
} from "@/actions/user.actions";
import { canManageUsers } from "@/utils/permissions";
import getSession from "@/utils/get-session";
import Link from "@/components/Link/link";
import UsersClientPage from "./page.client";

export default async function UsersPage(): Promise<JSX.Element> {
  const session = await getSession();

  const hasPermission = canManageUsers(session.user.roleId);

  if (!hasPermission) {
    return redirect("/unauthorized");
  }

  let userList: UserDTO[] = [];
  if (session.user.roleId === ROLES.ADMIN.ID) {
    userList = await getUserListByAdmin(session.user.id);
  } else {
    userList = await getUserListByManager(
      session.user.id,
      session.user.userRootId
    );
  }

  return (
    <Section>
      <div className="flex justify-between items-center">
        <SectionTitle>Mis Usuarios</SectionTitle>
        <Link href="/private/users/create" underline="hover">
          Nuevo Usuario
        </Link>
      </div>
      <SectionBody>
        <UsersClientPage
          userList={userList}
          userLoggedRole={session.user.roleId}
        />
      </SectionBody>
    </Section>
  );
}
