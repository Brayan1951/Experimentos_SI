export interface AuthResponse{
    ok:boolean;
    id?:string;
    nombre?:string;
    email?:string;
    token?:string;
    msg?:string;

}
export interface Usuario{
    id:string;
    nombre:string;
    email:string;
}

export interface Curso {
    _id:       string;
    usuario:  string;
    nombre:   string;
    profesor: Profesor ;
    horaI:string;
    horaF:string;
    descripcion:string;
}

export interface Profesor {
    _id:           string;
    usuario:      string;
    nombre:       string;
    apellido:     string;
    dni:          string;
    telefono:     string;
    email:        string;
    especialidad: string;
}


export interface Seccion {
    _id:      string;
    usuario: string;
    nombre:  string;
    curso:   Curso[];
    limite:  number;
    alumno:  Alumno[];
    

}

export interface Respuesta{
    ok:string;
    msg:string;
}

export interface Alumno {
    ok?:boolean;
    _id:       string;
    usuario:  string;
    nombre:   string;
    apellido: string;
    dni:      string;
    telefono: string;
    email:    string;
    gusto:    string;
}
