import {Schema, model, Document} from "mongoose";
import {UserRole} from "../types/auth.types.ts";


export interface IUserData {
    name: string;
    email: string;
    password: string;
    image?: string;
    role?: string;
    refreshToken?: string;
}

export interface IUser extends Document, IUserData {}


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    refreshToken: {
        type: String
    },
    clerkId: {
        type: String,
        required: true,
        unique: true
    }

}, {timestamps: true});

const User = model("User", userSchema);

export default User;