import { getAvatarLabel } from "@/utils/avatar-label";
import { canManageUsers } from "@/utils/permissions";
import Avatar from "@repo/ui/avatar";
import getSession from "@/utils/get-session";
import Link from "../Link/link";
import SignOutButton from "@/components/SignOutButton/SignOutButton";

export default async function PrivateNavbar(): Promise<JSX.Element> {
  const session = await getSession();

  const canShowUsersMenuLink = !session?.user.roleId
    ? false
    : canManageUsers(session?.user.roleId);

  if (session) {
    return (
      <nav className="flex items-baseline gap-3">
        <Link color="white" href="/private">
          Inicio
        </Link>
        <Link color="white" href="/private/restaurants">
          Mis Restaurantes
        </Link>
        {canShowUsersMenuLink && (
          <Link color="white" href="/private/users">
            Mis Usuarios
          </Link>
        )}
        {session.user?.username && (
          <Avatar label={getAvatarLabel(session.user.username)} />
        )}
        <SignOutButton />
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li>
          <Link color="white" href="/auth/login">
            Ingresar
          </Link>
        </li>
        <li>
          <Link color="white" href="/auth/register">
            Registrarte
          </Link>
        </li>
      </ul>
    </nav>
  );
}
