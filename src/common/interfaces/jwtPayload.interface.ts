import { IPayload } from "./payload.interface";


export interface JwtPayload extends IPayload {
  iat: number;
  exp: number;
}
