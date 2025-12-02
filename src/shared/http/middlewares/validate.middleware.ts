import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida tudo de uma vez (body, query e params)
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      return next();
    } catch (error) {
      // Passa o erro para o error.middleware tratar
      return next(error);
    }
  };