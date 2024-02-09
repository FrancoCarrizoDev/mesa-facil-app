"use client";

import { usePathname } from "next/navigation";
import Link from "../Link/link";

export default function Breadcrums() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== "");
  paths.pop();

  return (
    <div className="flex">
      {paths.map((path, index) => {
        return (
          <div key={index}>
            <Link href={`/${path}`}>{path}</Link>
            {index !== paths.length - 1 && <span className="mx-1">{">"}</span>}
          </div>
        );
      })}
    </div>
  );
}
