import slugify from "slugify";

export const slugifyString = (text: string): string => {
  return slugify(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

export default slugifyString;
