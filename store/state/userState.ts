import { User } from "@/constants/models/user";
import { AuthInput, RegisterInput, UpdateInput } from "@/services/authentService";

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (input: AuthInput) => Promise<User | false>;
  register: (input: RegisterInput) => Promise<User | false>;
  logout: () => void;
  updateUser: (input : UpdateInput) => Promise<User | null>; 
}