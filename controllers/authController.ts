  import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/appError";
import User from "../models/User";
import { userSchema } from "./validate";
import customerModel from "../models/Customer";
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
  // const cookieOptions: {
  //   expires: Date;
  //   httpOnly: boolean;
  //   secure?: boolean;
  // } = {
  //   expires: new Date(
  //     Date.now() +
  //       Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };
  res.cookie("token", refreshToken, {
    httpOnly: true,
    // secure: true, Utiliser ça en production
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  // if (process.env.NODE_ENV === "production") {
  //   cookieOptions.secure = true;
  // }
  user.password = undefined;
  res.status(statusCode).json({
    token,
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

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(new AppError("Mettez un mot de passe et une adresse mail", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password))) {
      return next(new AppError("Mot de passe ou email incorrecte", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { fullName, email, password, address, role } = req.body;
  const user = await customerModel.create({
    fullName,
    email,
    password,
    address,
    role,
  });
  createSendToken(user, 201, res);
});
