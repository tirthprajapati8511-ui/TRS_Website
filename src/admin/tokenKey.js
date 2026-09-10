// Shared between AdminPage (writes it after login) and fields.jsx (reads it
// for direct API calls like image upload) — its own file avoids a circular
// import between the two.
export const ADMIN_TOKEN_KEY = "trs_admin_token";
