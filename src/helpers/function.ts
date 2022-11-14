export const addTimeToFileName = (name: string): string => {
  const nameSplits = name.split(".");
  const first = nameSplits
    .filter((_, i) => i !== nameSplits.length - 1)
    .join(".");
  const last = nameSplits[nameSplits.length - 1];

  return `${first}_${new Date().getTime()}.${last}`;
};
