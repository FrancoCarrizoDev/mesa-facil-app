import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "../Link/link";

export default async function Navbar(): Promise<JSX.Element> {
  const { user } = (await getSession()) ?? {};

  if (user) {
    return (
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/private">Inicio</Link>
          </li>
          <li>
            <Link href="/private/restaurants">Mis Restaurantes</Link>
          </li>
          <li>
            <Link href="/private/reservs">Mis Reservas</Link>
          </li>
          <li>
            <Image
              alt="MesaFacil"
              className="rounded-full"
              height={30}
              src={user.picture}
              width={30}
            />
          </li>
          <li>
            <Link href="/api/auth/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav>
      <ul className="flex items-center gap-3">
        <li>
          <Link href="/api/auth/login">Ingresar</Link>
        </li>
      </ul>
    </nav>
  );
}
