const { Magic } = require("magic-sdk");

const createMagic = () => {
  if (typeof window === "undefined") return null;

  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY) // ✨
  );
};
export const magic = createMagic();
