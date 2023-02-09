import { Router } from 'express';
import { check } from 'express-validator';
import { createUser, loginUser, revalidateToken } from '../controllers/auth';
import { validateFields, validateJWT } from '../middlewares';


const routerAuth = Router();

routerAuth.post(
    "/register",
    [check("name", "El nombre es obligatorio.").not().isEmpty()],
    [check("email", "El email ingresado no es valido.").isEmail()],
    [check("password", "La contraseña debe tener 6 o mas caracteres.").isLength({ min: 6 })],
    validateFields,
    createUser
);

routerAuth.post(
    "/login",
    [check("email", "El email ingresado no es valido.").isEmail()],
    [check("password", "La contraseña debe tener 6 o mas caracteres.").isLength({ min: 6 })],
    validateFields,
    loginUser,
)

routerAuth.get("/renew", validateJWT, revalidateToken);

export default routerAuth;