import { getServerSession } from "next-auth";

export default async function Page(): Promise<JSX.Element> {
  return <div>Private</div>;
}
