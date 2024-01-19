export const getAvatarLabel = (name: string) => {
  const [firstName] = name.split(" ");
  const firstLetter = firstName[0];
  const secondLetter = firstName[1];
  return `${firstLetter}${secondLetter}`;
};
