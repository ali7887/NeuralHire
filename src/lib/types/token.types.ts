export interface AccessTokenPayload {
  sub: string;
  userId: string;
  role: string;
  type: "access";
}

export interface RefreshTokenPayload {
  tokenId: string;
  userId: string;
  type: "refresh";
}

export interface StoredRefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date | null;
  revokedAt: Date | null;
  replacedByTokenId: string | null;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
