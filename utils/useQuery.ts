import ValidationError from "./constantError";

const getPathId = (url?: string) => {
  // console.log("url",url);
  const getPathId = url?.split("/") ?? [];

  // console.log("getPathId",getPathId);

  // console.log("length", getPathId.length);
  if (getPathId.length > 5) {
    return getPathId[6];
  }

  return null
};

export default getPathId;
