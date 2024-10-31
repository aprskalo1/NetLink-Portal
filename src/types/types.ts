import {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    developerId: string;
    username: string;
    devToken: string;
    active: string;
    createdAt: string;
}

export interface UserState {
    developerId: string | null;
    username: string | null;
    devToken: string | null;
    active: boolean;
    createdAt: string | null;
}

export interface EndUser {
    id: string;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    createdAt: string;
    deletedAt: string | null;
    active: boolean;
}

