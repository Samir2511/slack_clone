import { StreamChat } from "stream-chat";

if (!process.env.STREAM_API_KEY || !process.env.STREAM_API_SECRET) {
  throw new Error("Missing Stream API credentials");
}

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

export const upsertStreamUser = async (userData: any) => {
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully:", userData.name);
        return userData;
    } catch (error) {
        
    }
}

export const deleteStreamUser = async (userId: string) => {
    try {
        await streamClient.deleteUser(userId);
        console.log("Stream user upserted successfully:", userId);

    } catch (error) {
        console.log(`Error deleting Stream users: ${error}`);
    }
}


export const generateStreamToken = (userId: string) => {
    try {
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("Error generating Stream token:", error);
        return null;
    }
}