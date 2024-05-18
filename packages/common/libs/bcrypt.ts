import { genSalt, hash, compare } from "bcryptjs";

const saltRounds = 10;
const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(saltRounds);

  const hashed = await hash(password, salt);

  return hashed;
};

const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await compare(plainPassword, hashedPassword);

  return match;
};

export { hashPassword, comparePasswords };
