import Link from "../Link/link";

export default function Navbar(): JSX.Element {
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
