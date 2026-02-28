import Cookies from "js-cookie";

const defaultAttributes: Cookies.CookieAttributes = {
  path: "/",
  sameSite: "Lax",
  ...(import.meta.env.PROD && { secure: true }),
};

/**
 * App-configured cookie API (path: '/', sameSite: 'Lax', secure in production).
 * Use this for all cookie read/write so defaults apply.
 */
export const cookies = Cookies.withAttributes(defaultAttributes);

/**
 * Raw js-cookie API when you need custom attributes or no defaults.
 */
export { Cookies };

/** Cookie options (path, expires, sameSite, etc.). Use Cookies.CookieAttributes in js-cookie types. */
export type CookieAttributes = Cookies.CookieAttributes;
