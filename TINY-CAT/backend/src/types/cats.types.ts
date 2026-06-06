import { Document } from "mongoose";


export interface Icat extends Document{
    name: string;
    breed: string;
    description: string;
    kidsFriendly: boolean;
    apartmentFriendly: boolean;
    lifeSpan: number;
    energyLevel: string;
    image: string;
    color: string;
}