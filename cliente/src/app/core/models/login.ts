export interface DataTypeUser{
    id: number,
    correo: string,
    nombre: string,
    apellido: string,
    tipo: string,
    rol: number
}

export interface LoginModel {
    message:string,
    token: string,
    user: DataTypeUser
}

export interface dataLoginUser {
    correo: string,
    contrasena: string
}