import { Schema, InferSchemaType, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/tJOSejv.png',
    },


})

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema)
