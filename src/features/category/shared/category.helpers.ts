import { validIcons } from "../../../util/constants/valid-icon.constants";

export const getIconByTag = (tag: string) => {
  const icon = validIcons.find((icon) => icon.tag === tag);
  console.log(icon!.icon);
  return icon ? icon.icon : null;
};
