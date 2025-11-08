import type { Request, Response } from "express";
import { generateStreamToken } from "../config/stream.ts";




class ChatController {


    getStreamToken = async (req: Request, res: Response) => {
        try {
            const token = await generateStreamToken((req as any).auth().userId);

            return res.status(200).json({token});
        } catch (error) {
            console.log("Error generating Stream token", error);
            
            res.status(500).json({message: `Failed to generate Stream token ${error}`});
        }
    }
}

export default new ChatController();