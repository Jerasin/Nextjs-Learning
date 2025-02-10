const getPathId = (url?: string) => {
  const getPathId = url?.split("/") ?? [];
  if (getPathId.length > 5) {
    return getPathId[6];
  }

  return null;
};

export default getPathId;
