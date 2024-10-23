import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    try {
      const response = await axios.post("https://localhost:4000/channels", {
        name,
        password,
      });
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(400).json({ error: "Failed to create channel" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
