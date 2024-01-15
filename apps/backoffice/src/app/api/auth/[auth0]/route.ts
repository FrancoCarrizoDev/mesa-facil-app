import {
  handleAuth,
  handleCallback,
  handleLogin,
  handleLogout,
  type Session,
} from "@auth0/nextjs-auth0";
import { type NextApiRequest } from "next";
import { encureExistsUser } from "src/app/actions/user";

const afterCallback = async (
  req: NextApiRequest,
  session: Session
): Promise<any> => {
  try {
    await encureExistsUser(session.user);
    return session;
  } catch (err) {
    const newSession: Session = {
      error: "Error logging in",
      user: [],
    };
    return newSession;
  }
};

export const GET = handleAuth({
  login: handleLogin((req) => {
    const querys = new URLSearchParams(req.url?.split("?")[1]);
    const redirectTo = querys.get("redirectTo");

    return {
      authorizationParams: {
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
      returnTo: redirectTo ?? "/private",
    };
  }),
  //@ts-expect-error library-error
  callback: handleCallback({ afterCallback }),
  logout: handleLogout((req) => {
    const querys = new URLSearchParams(req.url?.split("?")[1]);
    const redirectTo = querys.get("redirectTo");
    return {
      returnTo: redirectTo ?? "/",
    };
  }),
});
