import { omit } from "lodash-es";

import type { IUser } from "@/features/auth/types/IUser";
import { httpService } from "@/lib/http";

import type { IUserDto } from "./types/IUserDto";

export const getUser = () => {
  // mocking current user and its cartId by passing id=1
  return httpService
    .get<IUserDto>("users/1")
    .then((res) => ({ ...(omit(res, "password") as IUser), cartId: 1 }));
};
