import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import customerModel from "../models/Customer";
import AppError from "../utils/appError";
import mongoose from "mongoose";
interface DecodedToken extends JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET!, // Mauvais usage ici !
    { expiresIn: "7d" }
  );
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    // sameSite: "Strict" as const, // Strict pour éviter CSRF",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("accessToken", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 15 * 60 * 1000, // Expire en 15 minutes
  });

  // if (process.env.NODE_ENV === "production") {
  //   cookieOptions.secure = true;
  // }
  user.password = undefined;
  res.status(statusCode).json({
    token,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
  });
};

export interface AuthRequest extends Request {
  userId?: string; // Ajout du champ userId à la requête
}
const jwtVerifyPromisified = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, {}, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        status: "fail",
        message: "Vous n'êtes pas connecté, veuillez vous connecter",
      });
    }

    const token = authHeader.split(" ")[1];

    // Promisify jwt.verify
    const decoded = (await jwtVerifyPromisified(
      token,
      process.env.JWT_SECRET!
    )) as DecodedToken;
    req.userId = decoded.id;
    next();
  }
);
export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Token de rafraîchissement manquant" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string };

    // Génère un nouvel access token
    const newAccessToken = signToken(decoded.userId);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token de rafraîchissement invalide" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    // if (!email || !password) {
    //   next(new AppError("Mettez un mot de passe et une adresse mail", 400));
    // }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password))) {
      return res.status(400).json({
        email: "Email ou mot de passe incorrecte",
      });
    }
    createSendToken(user, 201, res);
  } catch (error) {
    // Check if the error is a Mongoose ValidationError
    if (error instanceof mongoose.Error.ValidationError) {
      const formattedErrors: { [key: string]: string } = {};

      // Loop through each error in `error.errors`
      Object.values(error.errors).forEach((err) => {
        formattedErrors[err.path] = err.message;
      });

      return res.status(400).json(formattedErrors);
    }
    return res.status(500).json({ error: (error as Error).message });
  }
};
export const signup = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body);
    createSendToken(user, 201, res);
  } catch (error) {
    console.log(error)
    // Check if the error is a Mongoose ValidationError
    if (error instanceof mongoose.Error.ValidationError) {
      const formattedErrors: { [key: string]: string } = {};

      // Loop through each error in `error.errors`
      Object.values(error.errors).forEach((err) => {
        formattedErrors[err.path] = err.message;
      });

      return res.status(400).json(formattedErrors);
    }
    return res.status(500).json({ error: (error as Error).message });
  }
};
