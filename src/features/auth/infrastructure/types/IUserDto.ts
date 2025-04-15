import type { IUser } from "@/features/auth/types/IUser";

export interface IUserDto extends IUser {
  password: string;
}
