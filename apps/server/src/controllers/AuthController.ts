import { Request, Response } from "express";

export class AuthController {
  static async login(req: Request, res: Response) {
    // Implement authentication logic
    res.json({ message: "Login successful" });
  }
}
