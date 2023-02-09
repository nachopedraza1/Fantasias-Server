import jwt, { Secret } from "jsonwebtoken"

export const generarJWT = (uid: string, name: string) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name }

        jwt.sign(payload, process.env.SECRET_JWT as Secret, {
            expiresIn: "1h"
        }, (error, token) => {
            if (error) {
                reject("No se pudo generar el token");
            }
            resolve(token)
        })
    })
}