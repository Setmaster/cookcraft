import { auth } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        res.status(200).json({ session });
    } catch (error) {
        res.status(500).json({ error: "Failed to get session" });
    }
}