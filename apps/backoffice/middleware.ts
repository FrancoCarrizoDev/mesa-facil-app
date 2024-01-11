import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse, type NextRequest } from "next/server";
import * as jose from "jose";

interface ErrorToken {
  code: "ERR_JWT_EXPIRED" | "VALID_TOKEN" | "INVALID_TOKEN";
  message: string;
}

export async function middleware(request: NextRequest) : Promise<NextResponse> {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  

  if (pathname.includes("/private")) {
    const { user, idToken, accessToken } =
      (await getSession(request, res)) ?? {};
    if (!user || !idToken || !accessToken) {
      const nextUrl = new URL("/", request.nextUrl.origin);
      const response = NextResponse.redirect(nextUrl);

      response.cookies.set("loginRequired", "true");
      return response;
    }

    const validateToken = await authenticateRequest(idToken);

    const nextUrl = new URL("/", request.nextUrl.origin);
    const response = NextResponse.redirect(nextUrl);
    if (validateToken.code === "ERR_JWT_EXPIRED") {
      response.cookies.set("tokenExpired", "true");
      return response;
    }

    if (validateToken.code === "INVALID_TOKEN") {
      response.cookies.set("loginRequired", "true");
      return response;
    }
  }

  if (pathname.includes("logout") || pathname.includes("login")) {
    res.cookies.delete("loginRequired");
    res.cookies.delete("tokenExpired");
    return res;
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};

async function authenticateRequest(
  token: string,
): Promise<ErrorToken> {
  const jwks = jose.createRemoteJWKSet(new URL(process.env.AUTH0_JWKS_URI || ""));
  try {
    await jose.jwtVerify(token.replace("Bearer ", ""), jwks);
    return {
      code: "VALID_TOKEN",
      message: "Authentication successful",
    };
  } catch (error: any) {
    if (error?.code === "ERR_JWT_EXPIRED") {
      return {
        code: "ERR_JWT_EXPIRED",
        message: "Authentication failed: Token expired",
      };
    }

    return {
      code: "INVALID_TOKEN",
      message: "Authentication failed: Invalid token",
    };
  }
}
