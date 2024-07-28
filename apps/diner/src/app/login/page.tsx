import PageClient from "./page.client";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

export default async function Page({
  searchParams,
}: Props): Promise<JSX.Element> {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <PageClient callbackUrl={searchParams.callbackUrl} />
    </main>
  );
}
