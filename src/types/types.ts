import {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    developerId: string;
    username: string;
    devToken: string;
    active: string;
    createdAt: string;
}

export interface UserState {
    developerId: string;
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

export interface Sensor {
    id: string;
    deviceName: string | null;
    deviceType: string | null;
    measurementUnit: string | null;
    deviceLocation: string | null;
    deviceDescription: string | null;
    createdAt: string;
}

export interface RecordedValue {
    value: number;
    recordedAt: string;
}