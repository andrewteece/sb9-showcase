import { httpService } from "@/lib/http";

export interface ICredentials {
  username: string;
  password: string;
}

export const loginUser = (body: ICredentials) => {
  return httpService.post<string>("auth/login", body);
};
