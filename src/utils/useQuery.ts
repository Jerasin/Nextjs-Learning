import { ValidationError } from "./constantError";

export const getPathId = (url?: string) => {
  const getPathId = url?.split("/") ?? [];

  console.log("length", getPathId.length);
  if (getPathId.length > 5) {
    return getPathId[6];
  }

  throw new ValidationError(
    "getPathId error",
    JSON.stringify(getPathId.length)
  );
};
