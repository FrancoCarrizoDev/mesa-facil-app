import bcrypt from "bcrypt";

const saltRounds = 10;
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    throw error;
  }
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);

    return match;
  } catch (error) {
    throw error;
  }
};
