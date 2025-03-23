import { User } from "@/constants/models/user";
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

export interface UpdateInput {
    id : number,
    userInput : RegisterInput
}
    
export async function login(authParams: AuthInput): Promise<User | null> {
    try {
        const response = await axios.post<User>(
            "https://ecoflow.mathieugr.fr/auth/login",
            authParams
        );
        
        if(response.status === 202 && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        return null;
    }
}


export async function register(registerParams : RegisterInput) : Promise<User | null> {
    try {
        const response = await axios.post<void>(
            "https://ecoflow.mathieugr.fr/auth/register",
            registerParams
        );
        if(response.status === 204 && response.data) {
            return response.data;
        }
        return null;
    } catch (error) {
        return null;
    }
}

export async function updateUser(updateInput : UpdateInput) : Promise<User | null>{

    try {
        const response = await axios.put<UpdateInput>("https://ecoflow.mathieugr.fr/auth/update",
            updateInput
        )
        console.log("reponse : " + response);

        if (response.status === 202 && response.data) {
            return response.data.userInput
        }
        return null;
    } catch (error) {
        return null;
    }

}