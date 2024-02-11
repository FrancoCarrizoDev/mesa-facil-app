"use client";

import { usePathname } from "next/navigation";
import Link from "../Link/link";
import { createBreadcrumsUrls } from "@/utils/breadcrums";

export default function Breadcrums() {
  const pathname = usePathname();
  const paths = createBreadcrumsUrls(pathname);

  return (
    <div className="flex">
      {paths.map(({ displayName, href }, index) => {
        return (
          <div key={index}>
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}${href}`}>
              {displayName}
            </Link>
            {index !== paths.length - 1 && <span className="mx-1">{">"}</span>}
          </div>
        );
      })}
    </div>
  );
}
