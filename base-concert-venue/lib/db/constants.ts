export const venueCapacity = 400;

export const getDbPath = (): string => {
  if (!process.env.DB_PATH) {
    throw new Error("Missing process.env.DB_PATH");
  }

  return process.env.DB_PATH;
};
