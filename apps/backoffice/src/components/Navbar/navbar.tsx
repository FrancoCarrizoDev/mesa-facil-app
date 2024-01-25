import { authOptions } from "src/utils/auth-options";
import { getAvatarLabel } from "@/utils/avatar-label";
import { getServerSession } from "next-auth/next";
import Avatar from "@repo/ui/avatar";
import Link from "../Link/link";
import SignOutButton from "@/components/SignOutButton/SignOutButton";

export default async function Navbar(): Promise<JSX.Element> {
  const session: any = await getServerSession(authOptions);

  if (session) {
    return (
      <nav className="flex items-baseline gap-3">
        <Link href="/private">Mi cuenta</Link>
        <Link href="/private/restaurants">Mis Restaurantes</Link>
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
