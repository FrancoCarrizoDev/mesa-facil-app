import { authOptions } from "src/app/api/auth/[...nextauth]/route";
import Link from "../Link/link";
import { getServerSession } from "next-auth/next";
import Avatar from "@repo/ui/avatar";
import { getAvatarLabel } from "../../../utils/avatar-label";
import SignOutButton from "../SignOutButton/SignOutButton";
export default async function Navbar(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session?.user?.name) {
    return (
      <nav className="flex gap-3">
        <Avatar label={getAvatarLabel(session.user.name)} />
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
