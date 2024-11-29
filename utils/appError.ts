// utils/appError.ts
export default class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  public placeholders?: { [key: string]: string };

  constructor(message: string, statusCode: number, placeholders?: { [key: string]: string }) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.placeholders = placeholders;

    Error.captureStackTrace(this, this.constructor);
  }
}