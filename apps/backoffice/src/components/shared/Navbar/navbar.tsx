import Link from "../Link/link";
import { getServerSession } from "next-auth/next";
import Avatar from "@repo/ui/avatar";
import { getAvatarLabel } from "../../../utils/avatar-label";
import SignOutButton from "../SignOutButton/SignOutButton";
import { authOptions } from "src/utils/auth-options";

export default async function Navbar(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <nav className="flex items-baseline gap-3">
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
