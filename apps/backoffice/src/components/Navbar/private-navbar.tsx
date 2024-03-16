import { getAvatarLabel } from "@/utils/avatar-label";
import Avatar from "@repo/ui/avatar";
import Link from "../Link/link";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { hasManageUsersPermission } from "@/utils/permissions";
import getSession from "@/utils/get-session";

export default async function PrivateNavbar(): Promise<JSX.Element> {
  const session = await getSession();

  const canShowUsersMenuLink = hasManageUsersPermission(
    session?.user.role || "EMPLOYEE"
  );

  console.log({ session });

  if (session) {
    return (
      <nav className="flex items-baseline gap-3">
        <Link href="/private">Inicio</Link>
        <Link href="/private/restaurants">Mis Restaurantes</Link>
        {canShowUsersMenuLink && (
          <Link href="/private/users">Mis Usuarios</Link>
        )}
        {session.user?.name && (
          <Avatar label={getAvatarLabel(session.user.name)} />
        )}
        <SignOutButton />
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li>
          <Link href="/auth/login">Ingresar</Link>
        </li>
        <li>
          <Link href="/auth/register">Registrarte</Link>
        </li>
      </ul>
    </nav>
  );
}
