import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
});

export const config = { matcher: ["/private/:path*"] };
