import type { User } from "../types/User";

// Helper function to read a raw cookie string by its name
const getCookies = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

/**
 * Reads the 'payload_cookie', extracts the JWT payload,
 * base64-decodes it, and returns a typed User object.
 */
export const extractUserFromCookie = (): User | null => {
  try {
    const rawCookie = getCookies("payload_cookie");
    if (!rawCookie) return null;

    // Cookie format: header.payload
    const parts = rawCookie.split(".");
    if (parts.length !== 2) return null;

    const base64Payload = parts[1];

    // Convert Base64Url to standard Base64 string for the browser's atob() function
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");

    // Safely decode base64 into a UTF-8 JSON string
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    // Parse it directly into TypeScript User interface
    return JSON.parse(jsonPayload) as User;
  } catch (error) {
    console.error("Failed to parse security cookie:", error);
    return null;
  }
};
