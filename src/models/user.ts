import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    photoURL: {
        type: String,
        default: null,
    }
});

/* UsuarioSchema.method("toJSON", function () {
    const { __v, _id, ...Object } = this.toOject();
    Object.id = _id
    return Object
}); */

export default model("User", UsuarioSchema);