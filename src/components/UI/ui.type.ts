type LiteralObject = {
  [key: string]: string,
};

export type FlexType = {
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-evenly",
};

export type BoxType = {
  classes: LiteralObject,
};

export type TextType = {
  color?: string,
};
