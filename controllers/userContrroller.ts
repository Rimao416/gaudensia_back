import { NextFunction, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AuthRequest } from "./authController";
import User from "../models/User";
import AppError from "../utils/appError";
export const getUserInfo = catchAsync(
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      console.log("Tu viens de faire une requete")

        const user = await User.findById(req.userId); // Récupérer l'utilisateur basé sur le userId

      if (!user) {
        return next(new AppError("Utilisateur non trouvé", 404));
      }
      res.status(200).json({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
  );