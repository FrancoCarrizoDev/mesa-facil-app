interface Breadcrum {
  displayName: string;
  href: string;
}

export function createBreadcrumsUrls(pathname: string) {
  const paths = pathname.split("/");

  const urls: Breadcrum[] = [];

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (!path) continue;
    if (path === "private") {
      urls.push({ displayName: "home", href: "/private" });
      continue;
    }
    const href = `${paths.slice(0, i + 1).join("/")}`;
    urls.push({ displayName: path, href });
  }

  return urls;
}
