import { Request, Response } from 'express';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { generarJWT } from '../helpers/generateJwt';
import User from '../models/user';


export const createUser = async (req: Request, res: Response) => {

    const { email, password }: { [key: string]: string } = req.body;

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                ok: false,
                message: "Un usuario ya existe con este correo."
            });
        }

        user = new User(req.body);

        const salt = genSaltSync();
        user.password = hashSync(password, salt);

        await user.save();

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            message: "Registro completado con Exito.",
            uid: user.id,
            name: user.name,
            photoURL: user.photoURL,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Hubo un error en el Servidor, por favor intente nuevamente en unos minutos."
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {

    const { email, password }: { [key: string]: string } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "El usuario no existe con este email."
            });
        }

        const validPassword = compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: "La contraseña no es valida."
            });
        }

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            photoURL: user.photoURL,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error de Login"
        });
    }
}

export const revalidateToken = async (req: Request, res: Response) => {

    const { uid, name } = req as TokenData

    const user = await User.findOne({ _id: uid })
    console.log(user)

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        photoURL: user?.photoURL,
        token
    })
}

interface TokenData {
    uid: string;
    name: string;
}
