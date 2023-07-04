import { Request, Response } from "express";
import { createUserService } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createUserService(req.body);
    res.status(200).send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
