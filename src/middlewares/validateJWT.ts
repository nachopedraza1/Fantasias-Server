import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token de acceso."
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT as Secret) as TokenData;

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'La sesión expiro, ingresa nuevamente.'
        });
    }

    next();
}

interface TokenData {
    uid: string,
    name: string
}

declare global {
    namespace Express {
        interface Request {
            uid: string,
            name: string
        }
    }
}

