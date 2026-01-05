import type UserWithId from "~~/lib/auth";

declare module "h3" {
// eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  };
}

export type langLongItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  label: string;
} & langLongItem;
