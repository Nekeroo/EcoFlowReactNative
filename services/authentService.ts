import axios, { AxiosResponse } from "axios";

export interface AuthInput {
    mail: string,
    password: string
}

export interface RegisterInput {
    firstName: string,
    lastName : string,
    mail: string,
    password: string
}

export async function login(authParams : AuthInput) : Promise<boolean> {
    try {
        await axios.post<void>(
            "https://ecoflow.mathieugr.fr/auth/login",
            authParams
        );
        
        // Si la requête réussit (status 204 - NO_CONTENT)
        return true;
    } catch (error) {
        // En cas d'erreur, retourne simplement false
        return false;
    }
}

export async function register(registerParams : RegisterInput) : Promise<User> {
    try {
        await axios.post<void>(
            "https://ecoflow.mathieugr.fr/auth/register",
            registerParams
        );

        return true;
    } catch (error) {
        return false;
    }
}