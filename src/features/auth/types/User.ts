export interface User {
  sub: string; // The subject (usually the user's email)
  roles: string[]; // e.g., ["ROLE_BUYER"]
  iat?: number; // Issued At (Timestamp)
  exp?: number; // Expiration Time (Timestamp)
}
