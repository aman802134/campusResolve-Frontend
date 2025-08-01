import { JwtPayload } from "./auth.payload";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
