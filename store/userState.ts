import { User } from "@/constants/models/user";
import { AuthInput, RegisterInput } from "@/services/authentService";

export interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (input : AuthInput) => Promise<boolean>;
    register : (input : RegisterInput) => Promise<boolean>;
    logout: () => void
}