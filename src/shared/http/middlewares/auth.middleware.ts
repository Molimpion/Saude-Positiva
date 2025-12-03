import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token JWT não informado.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET || "default_secret");
    const { sub } = decoded as TokenPayload;

    // @ts-ignore (Ignora erro de tipagem do Express se não houver @types customizado)
    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError("Token JWT inválido.", 401);
  }
}