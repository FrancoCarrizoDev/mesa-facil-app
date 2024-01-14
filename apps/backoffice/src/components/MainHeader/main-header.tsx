import Image from "next/image";
import Link from "next/link";

export default function MainHeader(): JSX.Element {
  return (
    <header className="border-b flex justify-between items-center px-5">
      <div className="flex gap-3 items-center ">
        <h1 className="text-3xl font-bold text-center text-orange-">
          Mesa <br /> Facil
        </h1>
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            filter: "brightness(1.1)",
            mixBlendMode: "multiply",
          }}
        >
          <Image alt="Mesa Facil" fill sizes="100px" src="/logo2.jpg" />
        </div>
      </div>
      <nav>
        <ul className="flex gap-3">
          <li>
            <Link href="/api/auth/login">Login</Link>
          </li>
          <li>
            <Link href="/api/auth/login">Registro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
