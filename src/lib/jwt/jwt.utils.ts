import { SignJWT, jwtVerify } from "jose";
import type {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordTokenPayload,
  EmailVerifyTokenPayload,
  UserRole,
} from "./jwt.types";

const getSecret = (envVar: string): Uint8Array => {
  // eslint-disable-next-line no-undef
  const secret = process.env[envVar];
  if (!secret) {
    throw new Error(`Environment variable ${envVar} is missing!`);
  }
  return new TextEncoder().encode(secret);
};

const CONFIG = {
  access: { secret: "JWT_SECRET", expires: "15m" },
  refresh: { secret: "JWT_REFRESH_SECRET", expires: "30d" },
  reset: { secret: "JWT_RESET_SECRET", expires: "15m" },
  email: { secret: "JWT_EMAIL_VERIFY_SECRET", expires: "30m" },
} as const;

export async function signAccessToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): Promise<string> {
  return new SignJWT({ ...payload, type: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(CONFIG.access.expires)
    .sign(getSecret(CONFIG.access.secret));
}

export async function signRefreshToken(payload: {
  tokenId: string;
  userId: string;
}): Promise<string> {
  return new SignJWT({ ...payload, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(CONFIG.refresh.expires)
    .sign(getSecret(CONFIG.refresh.secret));
}

export async function signResetPasswordToken(payload: {
  userId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({ ...payload, type: "reset" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(CONFIG.reset.expires)
    .sign(getSecret(CONFIG.reset.secret));
}

export async function signEmailVerificationToken(payload: {
  userId: string;
  email: string;
}): Promise<string> {
  return new SignJWT({ ...payload, type: "email_verify" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(CONFIG.email.expires)
    .sign(getSecret(CONFIG.email.secret));
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(CONFIG.access.secret));
  if (payload.type !== "access") throw new Error("Invalid token type");
  return payload as unknown as AccessTokenPayload;
}

export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(CONFIG.refresh.secret));
  if (payload.type !== "refresh") throw new Error("Invalid token type");
  return payload as unknown as RefreshTokenPayload;
}

export async function verifyResetPasswordToken(token: string): Promise<ResetPasswordTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(CONFIG.reset.secret));
  if (payload.type !== "reset") throw new Error("Invalid token type");
  return payload as unknown as ResetPasswordTokenPayload;
}

export async function verifyEmailVerificationToken(token: string): Promise<EmailVerifyTokenPayload> {
  const { payload } = await jwtVerify(token, getSecret(CONFIG.email.secret));
  if (payload.type !== "email_verify") throw new Error("Invalid token type");
  return payload as unknown as EmailVerifyTokenPayload;
}
